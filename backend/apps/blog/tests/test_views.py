from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.blog.models import Post


class PostCRUDTests(APITestCase):

    def setUp(self):
        self.post = Post.objects.create(
            title='Test Post',
            content='Test content here.',
            excerpt='Short excerpt',
            status=Post.Status.PUBLISHED,
        )
        self.list_url = reverse('post-list')
        self.detail_url = reverse('post-detail', kwargs={'pk': self.post.pk})

    # LIST
    def test_list_posts(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)

    def test_filter_by_status(self):
        Post.objects.create(title='Draft Post', content='...', status=Post.Status.DRAFT)
        response = self.client.get(self.list_url, {'status': 'published'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for post in response.data['results']:
            self.assertEqual(post['status'], 'published')

    # CREATE
    def test_create_post(self):
        payload = {'title': 'New Post', 'content': 'New content', 'status': 'draft'}
        response = self.client.post(self.list_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], 'New Post')
        self.assertIn('slug', response.data)

    def test_create_post_slug_auto_generated(self):
        payload = {'title': 'Hello World', 'content': 'Content', 'status': 'draft'}
        response = self.client.post(self.list_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['slug'], 'hello-world')

    def test_create_post_missing_required_fields(self):
        response = self.client.post(self.list_url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # RETRIEVE
    def test_retrieve_post(self):
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(str(response.data['id']), str(self.post.id))

    # UPDATE
    def test_partial_update_post(self):
        response = self.client.patch(self.detail_url, {'title': 'Updated Title'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Updated Title')

    def test_full_update_post(self):
        payload = {'title': 'Full Update', 'content': 'Updated content', 'status': 'published'}
        response = self.client.put(self.detail_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Full Update')

    # DELETE
    def test_delete_post(self):
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Post.objects.filter(pk=self.post.pk).exists())

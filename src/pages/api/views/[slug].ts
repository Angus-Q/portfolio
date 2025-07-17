// src/pages/api/views/[slug].ts
import type { APIRoute } from 'astro';
import { getStore } from '@netlify/blobs';

export const prerender = false;

const getViewsStore = () => getStore('views');

export const POST: APIRoute = async ({ params }) => {
  const { slug } = params;
  if (!slug) {
    return new Response('Slug not provided', { status: 400 });
  }

  const store = getViewsStore();
  const currentViews = await store.get(slug, { type: 'json' }) as number || 0;
  const newViews = currentViews + 1;

  await store.setJSON(slug, newViews);

  return new Response(JSON.stringify({ views: newViews }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const GET: APIRoute = async ({ params }) => {
    const { slug } = params;
    if (!slug) {
        return new Response('Slug not provided', { status: 400 });
    }

    const store = getViewsStore();
    const views = await store.get(slug, { type: 'json' }) as number || 0;

    return new Response(JSON.stringify({ views }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};
import { sanityClient } from './sanityConnection';

export async function fetchContent(query, params = {}) {
    try {
        const data = await sanityClient.fetch(query, params, {
            perspective: 'published',
            next: { revalidate: 10 },
        });

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch data');
    }
}
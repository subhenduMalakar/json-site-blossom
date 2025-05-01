import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import staticPagesData from '../data/staticPages.json'; // Importing the local JSON file

interface StaticPageContent {
  slug: string;
  title: string;
  content: string;
}

const StaticPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [pageContent, setPageContent] = useState<StaticPageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This effect runs whenever 'pageContent' changes.
    if (pageContent) {
      document.title = pageContent.title;
      // You might want to add meta description handling here as well,
      // similar to BlogDetail, if your staticPages.json includes it.
    }
    // Cleanup function to reset title if component unmounts or pageContent becomes null
    return () => {
      document.title = "Site Title"; // Or a default site title
    };
  }, [pageContent]);

  useEffect(() => {
    console.log("StaticPage component mounted. Slug:", slug);
    console.log("Static pages data:", staticPagesData);

    // Simulate fetching data and finding the page by slug
    try {
      const foundPage = (staticPagesData as StaticPageContent[]).find(p => p.slug === slug);
      if (foundPage) {
        setPageContent(foundPage);
      } else {
        setError('Page not found.');
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to load page content.');
      setLoading(false);
    }
  }, [slug]); // Rerun effect if slug changes

  if (loading) {
    return <div>Loading page content...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pageContent) {
    return <div>Page not found.</div>;
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{pageContent.title}</h1>
      </header>
      <section className="prose lg:prose-xl max-w-none">
        {/* Render HTML content */}
        <div dangerouslySetInnerHTML={{ __html: pageContent.content }} />
      </section>
    </article>
  );
};

export default StaticPage;
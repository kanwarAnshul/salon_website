'use client';

import { motion } from 'motion/react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Clock, User, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: '1',
    title: '10 Hair Care Tips for Healthy and Shiny Locks',
    excerpt: 'Discover the secrets to maintaining beautiful, healthy hair with our expert tips from professional stylists.',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80',
    author: 'Sarah Johnson',
    authorImage: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400&q=80',
    category: 'Hair Care',
    date: '2024-03-15',
    readTime: '5 min read',
    slug: '10-hair-care-tips',
    featured: true,
  },
  {
    id: '2',
    title: 'Bridal Makeup Trends for 2024',
    excerpt: 'From soft glam to bold eyes, explore the hottest bridal makeup trends that are stealing the spotlight.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80',
    author: 'David Kumar',
    authorImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    category: 'Makeup',
    date: '2024-03-10',
    readTime: '4 min read',
    slug: 'bridal-makeup-trends-2024',
  },
  {
    id: '3',
    title: 'The Ultimate Guide to Skincare Routine',
    excerpt: 'Build the perfect skincare routine with our step-by-step guide for all skin types.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    author: 'Emma Williams',
    authorImage: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&q=80',
    category: 'Skin Care',
    date: '2024-03-05',
    readTime: '6 min read',
    slug: 'ultimate-skincare-routine',
  },
  {
    id: '4',
    title: 'Men\'s Grooming Essentials',
    excerpt: 'Every man needs these grooming essentials in his arsenal. From beard care to skincare basics.',
    image: 'https://images.unsplash.com/photo-1506836467174-27f1042aa48c?w=800&q=80',
    author: 'Michael Chen',
    authorImage: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=400&q=80',
    category: "Men's Grooming",
    date: '2024-02-28',
    readTime: '3 min read',
    slug: 'mens-grooming-essentials',
  },
];

export default function BlogSection() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <section className="py-20 glass">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="primary" className="mb-4">Blog</Badge>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Latest <span className="text-gradient">Insights</span>
            </h2>
            <p className="text-text-light max-w-2xl mx-auto">
              Stay updated with the latest beauty trends, tips, and expert advice from our team.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8">
          {featuredPost && (
            <ScrollReveal delay={0.1}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative bg-background-alt rounded-2xl overflow-hidden shadow-xl h-full group cursor-pointer"
              >
                <div className="relative h-64 lg:h-80 bg-gradient-to-br from-primary/20 to-accent-pink/10 overflow-hidden">
                  <img src={featuredPost.image} alt={featuredPost.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-alt via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="warning">Featured</Badge>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4 text-sm text-white/60">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                    <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-6 line-clamp-2">{featuredPost.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent-pink flex items-center justify-center overflow-hidden">
                        <img
                          src={featuredPost.authorImage}
                          alt={featuredPost.author}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.innerHTML = `<span class="text-foreground font-bold text-sm">${featuredPost.author.split(' ').map(n => n[0]).join('')}</span>`;
                          }}
                        />
                      </div>
                      <span className="text-white/80 text-sm">{featuredPost.author}</span>
                    </div>

                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </motion.article>
            </ScrollReveal>
          )}

          <div className="space-y-6">
            {regularPosts.map((post, index) => (
              <ScrollReveal key={post.id} delay={0.2 + index * 0.1}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex bg-background rounded-2xl overflow-hidden shadow-lg shadow-black/5 border border-primary/10 group cursor-pointer"
                >
                  <div className="w-32 sm:w-40 flex-shrink-0 bg-gradient-to-br from-primary/10 to-accent-pink/20 relative overflow-hidden">
                      <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>

                  <div className="flex-1 p-5">
                    <div className="flex items-center gap-3 mb-2 text-xs text-text-light">
                      <Badge variant="primary" className="text-[10px]">{post.category}</Badge>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-text-light line-clamp-2 mb-3">{post.excerpt}</p>

                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent-pink flex items-center justify-center overflow-hidden">
                        <img
                          src={post.authorImage}
                          alt={post.author}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.innerHTML = `<span class="text-foreground font-bold text-[8px]">${post.author.split(' ').map(n => n[0]).join('')}</span>`;
                          }}
                        />
                      </div>
                      <span className="text-xs text-text-light">{post.author}</span>
                    </div>
                  </div>
                </motion.article>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View All Articles
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  FileText, 
  Eye, 
  Dna, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  Users, 
  ArrowRight,
  BarChart3,
  TrendingUp,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';

interface DashboardData {
  stats: {
    testimonials: number;
    approvedTestimonials: number;
    pendingTestimonials: number;
    blogPosts: number;
    publishedPosts: number;
    cancers: number;
  };
  recentTestimonials: {
    id: string;
    name: string;
    cancerType: string;
    excerpt: string;
    date: string;
    approved: boolean;
  }[];
  recentPosts: {
    id: string;
    title: string;
    author: string;
    publishedDate: string;
    category: string;
    published: boolean;
    image: string;
  }[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!data) {
    return <p className="text-red-500">Erreur lors du chargement du tableau de bord.</p>;
  }

  const approvedPercentage = data.stats.testimonials > 0 
    ? Math.round((data.stats.approvedTestimonials / data.stats.testimonials) * 100) 
    : 0;
  
  const publishedPercentage = data.stats.blogPosts > 0 
    ? Math.round((data.stats.publishedPosts / data.stats.blogPosts) * 100) 
    : 0;

  const statCards = [
    {
      label: 'Témoignages',
      value: data.stats.testimonials,
      sub: `${data.stats.pendingTestimonials} en attente`,
      icon: Users,
      bgColor: 'bg-gradient-to-r from-indigo-600 to-indigo-700',
      href: '/admin/testimonials',
    },
    {
      label: 'Articles Blog',
      value: data.stats.blogPosts,
      sub: `${data.stats.publishedPosts} publiés`,
      icon: BookOpen,
      bgColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      href: '/admin/blog',
    },
    {
      label: 'Types de Cancer',
      value: data.stats.cancers,
      sub: 'Pages gérées',
      icon: ShieldCheck,
      bgColor: 'bg-gradient-to-r from-emerald-400 to-green-500',
      href: '/admin/cancers',
    },
    {
      label: 'À valider',
      value: data.stats.pendingTestimonials,
      sub: 'Témoignages',
      icon: MessageSquare,
      bgColor: 'bg-gradient-to-r from-lime-400 to-green-500',
      href: '/admin/testimonials',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Column: Profile & Stats Grid */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex flex-col items-center text-center mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg mb-4 border-4 border-white">
                A
              </div>
              <h3 className="text-xl font-bold text-gray-900">Admin</h3>
              <p className="text-gray-500">Administrateur</p>
            </div>

            <div className="flex justify-around mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600">{approvedPercentage}%</p>
                <p className="text-xs text-gray-500">Approuvés</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{publishedPercentage}%</p>
                <p className="text-xs text-gray-500">Publiés</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800 text-sm">Activité Récente</h4>
              <div className="space-y-2">
                {data.recentTestimonials.slice(0, 2).map((t, index) => (
                  <div key={t.id} className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded flex items-center justify-center flex-shrink-0">
                      {t.approved ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 truncate">
                        {t.approved ? `Témoignage ${t.name} approuvé` : `Nouveau témoignage de ${t.name}`}
                      </p>
                      <p className="text-xs text-gray-500">{new Date(t.date).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                ))}
                {data.recentPosts.slice(0, 1).map((post, index) => (
                  <div key={post.id} className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 truncate">
                        {post.published ? `Article "${post.title}" publié` : `Nouvel article "${post.title}"`}
                      </p>
                      <p className="text-xs text-gray-500">{new Date(post.publishedDate).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                ))}
                {data.recentTestimonials.length === 0 && data.recentPosts.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-2">Pas d'activité récente</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Link 
                  key={stat.label} 
                  href={stat.href} 
                  className="block"
                >
                  <div className={`${stat.bgColor} text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all flex items-center justify-between`}>
                    <div>
                      <h4 className="text-sm opacity-90 font-medium">{stat.label}</h4>
                      <p className="text-4xl font-bold mt-1">{stat.value}</p>
                      <p className="text-xs opacity-80 mt-2">{stat.sub}</p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Charts & Recent Items */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activity Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-4 text-sm font-medium text-gray-500">
                  <button className="text-purple-600 border-b-2 border-purple-600 pb-1">Activité</button>
                  <button className="hover:text-gray-700 pb-1">Stats</button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Juillet 2025</span>
                </div>
              </div>

              {/* Placeholder Chart */}
              <div className="h-52 bg-gradient-to-b from-indigo-50 to-white rounded-xl border border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Graphique d&apos;activité</p>
                </div>
              </div>
            </div>

            {/* Recent Items */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Récents</h3>
              
              <div className="space-y-4">
                {data.recentTestimonials.length > 0 ? (
                  data.recentTestimonials.slice(0, 2).map((t) => (
                    <div key={t.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                        {t.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                        <p className="text-xs text-gray-600 truncate">{t.excerpt}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          t.approved 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {t.approved ? 'Approuvé' : 'En attente'}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    Pas d&apos;activité récente
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link href="/admin/cancers" className="block">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center">
                <Dna className="w-7 h-7 text-indigo-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Types de Cancer</p>
                <p className="text-sm text-gray-500">Gérer les fiches</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
            </div>
          </div>
        </Link>
        <Link href="/admin/testimonials" className="block">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-rose-200 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-7 h-7 text-rose-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Témoignages</p>
                <p className="text-sm text-gray-500">Approuver & publier</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
            </div>
          </div>
        </Link>
        <Link href="/admin/blog" className="block">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-green-200 rounded-xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-emerald-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Blog</p>
                <p className="text-sm text-gray-500">Rédiger des articles</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

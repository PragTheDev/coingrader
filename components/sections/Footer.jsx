"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Github,
  Twitter,
  Mail,
  Shield,
  Coins,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "How It Works", href: "#how-it-works" },
        { name: "Pricing", href: "#pricing" },
        { name: "Features", href: "#features" },
        { name: "Supported Coins", href: "#supported-coins" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Blog", href: "#blog" },
        { name: "Careers", href: "#careers" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#help" },
        { name: "API Documentation", href: "#api" },
        { name: "Community", href: "#community" },
        { name: "Status", href: "#status" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Terms of Service", href: "#terms" },
        { name: "Cookie Policy", href: "#cookies" },
        { name: "Disclaimer", href: "#disclaimer" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Github, href: "#github", label: "GitHub" },
    { icon: Twitter, href: "#twitter", label: "Twitter" },
    { icon: Mail, href: "#email", label: "Email" },
  ];

  return (
    <footer className="mt-20">
      <Card className="glass bg-gradient-to-br from-slate-50/80 via-white/80 to-slate-100/80 dark:from-slate-900/80 dark:via-slate-800/80 dark:to-slate-900/80 border-slate-200/50 dark:border-slate-700/50 shadow-2xl rounded-t-3xl rounded-b-none">
        <CardContent className="p-12">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-5 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                  <Coins className="relative h-8 w-8 text-blue-600 dark:text-blue-400 animate-float" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  CoinGrader
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                Professional AI-powered coin grading and valuation platform
                trusted by collectors worldwide.
              </p>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold text-xs px-2 py-1">
                  Secure & Trusted
                </Badge>
              </div>
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm flex items-center gap-1 group"
                      >
                        {link.name}
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              {/* Copyright */}
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                <span>© {currentYear} CoinGrader. Made with</span>
                <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                <span>for coin collectors.</span>
              </div>

              {/* Additional Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>All systems operational</span>
                </div>
                <Badge
                  variant="outline"
                  className="border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300"
                >
                  v2.1.0
                </Badge>
                <div className="text-slate-500 dark:text-slate-400 text-xs">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
                <p className="font-semibold mb-1">
                  Trusted by 10,000+ collectors
                </p>
                <p>99.9% uptime • Bank-grade security • 24/7 support</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </footer>
  );
}

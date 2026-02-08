import React from 'react';
import Image from 'next/image';

const Footer = () => {
  const footerData = {
    platform: [
      { name: 'Fusion', href: '/fusion' },
      { name: 'Publish', href: '/publish' },
      { name: 'Product Updates', href: '/product-updates' },
    ],
    useCases: [
      { name: 'Design to Code', href: '/m/design-to-code' },
      { name: 'Headless CMS', href: '/headless-cms' },
      { name: 'Multi-Brand CMS', href: '/m/multi-brand-cms' },
      { name: 'Landing Pages', href: '/landing-pages' },
      { name: 'Web Apps', href: '/web-apps' },
      { name: 'Prototypes', href: '/prototypes' },
      { name: 'Marketing Sites', href: '/m/marketing-sites' },
      { name: 'Headless Commerce', href: '/m/headless-commerce' },
    ],
    developerResources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Fusion Docs', href: '/fusion-docs' },
      { name: 'Publish Docs', href: '/publish-docs' },
    ],
    frameworks: [
      { name: 'Design to Code >', href: '/design-to-code' },
      { name: 'CMS >', href: '/cms' },
      { name: 'Page Builder >', href: '/page-builder' },
    ],
    workflows: [
      { name: 'Figma AI to Production Code', href: '/figma-to-code' },
      { name: 'AI Prototyping for Product Managers', href: '/ai-prototyping' },
      { name: 'Figma to Storybook', href: '/figma-to-storybook' },
      { name: 'Figma to App Converter', href: '/figma-to-app' },
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Webinars', href: '/webinars' },
      { name: 'Guides', href: '/guides' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Community Forum', href: '/forum' },
      { name: 'Partners', href: '/partners' },
      { name: 'Affiliate Program', href: '/affiliate' },
      { name: 'CMS Integrations', href: '/integrations' },
      { name: 'CMS Blueprints', href: '/blueprints' },
      { name: 'Glossary', href: '/glossary' },
    ],
    popularGuides: [
      { name: 'Figma to Code Guide', href: '/guides/figma-to-code' },
      { name: 'Headless CMS Guide', href: '/guides/headless-cms' },
      { name: 'Headless Commerce Guide', href: '/guides/headless-commerce' },
      { name: 'Composable DXP Guide', href: '/guides/composable-dxp' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'News', href: '/news' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact Sales', href: '/contact-sales' },
      { name: 'Security', href: '/security' },
    ],
  };

  const socialIcons = [
    { src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c2776863-8ec9-4a99-8182-65445fc9a0f2-builder-io/assets/images/images_26.png', alt: 'YouTube' },
    { src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c2776863-8ec9-4a99-8182-65445fc9a0f2-builder-io/assets/images/images_27.png', alt: 'GitHub' },
    { src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c2776863-8ec9-4a99-8182-65445fc9a0f2-builder-io/assets/images/images_28.png', alt: 'Twitter/X' },
    { src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c2776863-8ec9-4a99-8182-65445fc9a0f2-builder-io/assets/images/images_29.png', alt: 'LinkedIn' },
    { src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/c2776863-8ec9-4a99-8182-65445fc9a0f2-builder-io/assets/images/images_30.png', alt: 'RSS' },
  ];

  return (
    <footer className="bg-black text-white pt-[120px] pb-[40px] font-sans">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-12 gap-x-10 mb-20">
          {/* Column 1 */}
          <div>
            <div className="mb-10">
              <h3 className="footer-header">Platform</h3>
              <ul className="flex flex-col">
                {footerData.platform.map((link) => (
                  <a key={link.name} href={link.href} className="footer-link">
                    {link.name}
                  </a>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="footer-header">Use Cases</h3>
              <ul className="flex flex-col">
                {footerData.useCases.map((link) => (
                  <a key={link.name} href={link.href} className="footer-link">
                    {link.name}
                  </a>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <div className="mb-10">
              <h3 className="footer-header">Developer Resources</h3>
              <ul className="flex flex-col">
                {footerData.developerResources.map((link) => (
                  <a key={link.name} href={link.href} className="footer-link">
                    {link.name}
                  </a>
                ))}
              </ul>
            </div>
            <div className="mb-10">
              <h3 className="footer-header">Frameworks</h3>
              <ul className="flex flex-col">
                {footerData.frameworks.map((link) => (
                  <a key={link.name} href={link.href} className="footer-link">
                    {link.name}
                  </a>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="footer-header">Workflows</h3>
              <ul className="flex flex-col">
                {footerData.workflows.map((link) => (
                  <a key={link.name} href={link.href} className="footer-link">
                    {link.name}
                  </a>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="footer-header">Resources</h3>
            <ul className="flex flex-col">
              {footerData.resources.map((link) => (
                <a key={link.name} href={link.href} className="footer-link">
                  {link.name}
                </a>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <div className="mb-10">
              <h3 className="footer-header">Popular Guides</h3>
              <ul className="flex flex-col">
                {footerData.popularGuides.map((link) => (
                  <a key={link.name} href={link.href} className="footer-link">
                    {link.name}
                  </a>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="footer-header">Company</h3>
              <ul className="flex flex-col">
                {footerData.company.map((link) => (
                  <a key={link.name} href={link.href} className="footer-link">
                    {link.name}
                  </a>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar Divider */}
        <div className="border-t border-[#333333] pt-8 mt-12">
          <div className="flex flex-col gap-6">
            {/* Legal Links Row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#999999]">
              <span className="text-white">© 2026 Builder.io, Inc.</span>
              <a href="/security" className="hover:text-white transition-colors">Security</a>
              <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/saas-terms" className="hover:text-white transition-colors">SaaS Terms</a>
              <a href="/trust-center" className="hover:text-white transition-colors">Trust Center</a>
              <button className="hover:text-white transition-colors appearance-none bg-transparent border-none p-0">Cookie Preferences</button>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-4">
              {socialIcons.map((icon, idx) => (
                <a key={idx} href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                  <Image 
                    src={icon.src} 
                    alt={icon.alt} 
                    width={20} 
                    height={20} 
                    className="object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
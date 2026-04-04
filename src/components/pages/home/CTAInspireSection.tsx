'use client';

import React from 'react';
import { ConfigurableCTA } from '@/components/nurui/configurable-cta';

/**
 * CTAInspireSection Component
 * Home page section that showcases a call-to-action inspire card
 * Uses the reusable ConfigurableCTA component with Nurui-specific defaults
 *
 * This component is responsible for:
 * - Providing default messaging aligned with Nurui brand
 * - Handling section-level styling and spacing
 * - Managing interactions and analytics hooks (if needed)
 */
export default function CTAInspireSection() {
  /**
   * Handler for primary CTA action
   * Can be extended to track analytics, trigger modals, or navigate
   */
  const handleBookCall = () => {
    // TODO: Integrate with your booking system (Calendly, Stripe, etc.)
    // For now, this could open a modal or redirect to booking page
    console.log('[CTA] Book a free call clicked');
    // Example: window.location.href = '/booking';
  };

  /**
   * Handler for secondary CTA action
   * Can be extended for email capture, contact form, etc.
   */
  const handleEmailUs = () => {
    // TODO: Integrate with your email system or open contact form
    console.log('[CTA] Email us clicked');
    // Example: window.location.href = 'mailto:hello@nurui.com';
  };

  return (
    <section className="m-6 md:m-0 md:px-6">
      <ConfigurableCTA
        // Avatar customization
        avatarInitials="You"
        avatarBgColor="bg-gradient-to-br from-blue-400 to-purple-600"
        showAvatar={true}

        // Content
        headline="Got a Project?"
        subtitle="Book a free discovery call."
        quote="We believe in people, not forms. Book a call and let&apos;s talk directly. 😎"

        // Primary CTA
        primaryButtonText="Book a free call"
        primaryButtonAction={handleBookCall}

        // Secondary CTA
        secondaryButtonText="Email us"
        secondaryButtonAction={handleEmailUs}
        showSecondaryButton={true}

        // Styling - uses project design tokens
        containerClassName="max-w-4xl mx-auto"
        headlineClassName="text-4xl md:text-5xl lg:text-5xl font-bold"
        subtitleClassName="text-lg md:text-xl"
        quoteClassName="text-base md:text-lg"
        bgGlassColor="bg-[var(--glass-color-2)]"
        borderColor="border-[var(--glass-color-3)]"
      />
    </section>
  );
}

'use client';

import React from 'react';
import { Button } from '@/components/nurui/button';

/**
 * Props interface for the ConfigurableCTA component
 * Provides full flexibility for customization across the application
 */
export interface ConfigurableCTAProps {
  // Avatar/Profile section
  avatarInitials?: string;
  avatarBgColor?: string;
  avatarTextColor?: string;
  showAvatar?: boolean;

  // Content
  headline: string;
  subtitle: string;
  quote: string;

  // Primary CTA Button
  primaryButtonText: string;
  primaryButtonAction?: () => void;
  primaryButtonHref?: string;

  // Secondary CTA Button
  secondaryButtonText?: string;
  secondaryButtonAction?: () => void;
  secondaryButtonHref?: string;
  showSecondaryButton?: boolean;

  // Styling
  containerClassName?: string;
  headlineClassName?: string;
  subtitleClassName?: string;
  quoteClassName?: string;
  bgGlassColor?: string;
  borderColor?: string;
}

/**
 * ConfigurableCTA Component
 * A reusable, highly configurable Call-To-Action card component
 * that adapts to various use cases while maintaining design system consistency
 *
 * @param {ConfigurableCTAProps} props - Configuration options for the CTA
 * @returns {React.ReactElement} The rendered CTA component
 */
export const ConfigurableCTA: React.FC<ConfigurableCTAProps> = ({
  // Avatar props with defaults
  avatarInitials = 'You',
  avatarBgColor = 'bg-gradient-to-br from-blue-400 to-blue-600',
  avatarTextColor = 'text-white',
  showAvatar = true,

  // Content - required
  headline,
  subtitle,
  quote,

  // Primary button - required
  primaryButtonText,
  primaryButtonAction,
  primaryButtonHref,

  // Secondary button - optional
  secondaryButtonText,
  secondaryButtonAction,
  secondaryButtonHref,
  showSecondaryButton = true,

  // Styling with defaults
  containerClassName = 'max-w-4xl mx-auto',
  headlineClassName = 'text-4xl md:text-5xl font-bold',
  subtitleClassName = 'text-lg md:text-xl',
  quoteClassName = 'text-sm md:text-base',
  bgGlassColor = 'bg-[var(--glass-color-2)]',
  borderColor = 'border-[var(--border-color)]',
}) => {
  const handlePrimaryClick = () => {
    if (primaryButtonHref) {
      window.location.href = primaryButtonHref;
    } else if (primaryButtonAction) {
      primaryButtonAction();
    }
  };

  const handleSecondaryClick = () => {
    if (secondaryButtonHref) {
      window.location.href = secondaryButtonHref;
    } else if (secondaryButtonAction) {
      secondaryButtonAction();
    }
  };

  return (
    <div className={containerClassName}>
      {/* Main Glass Card Container */}
      <div
        className={`
          ${bgGlassColor}
          border ${borderColor}
          rounded-3xl
          px-8 md:px-12
          py-12 md:py-16
          backdrop-blur-xl
          shadow-2xl
          transition-all duration-300 ease-out
          hover:shadow-2xl
        `}
      >
        {/* Avatar Section */}
        {showAvatar && (
          <div className="flex items-center gap-4 mb-8">
            <div
              className={`
                ${avatarBgColor}
                ${avatarTextColor}
                w-16 h-16
                rounded-full
                flex items-center justify-center
                font-bold text-lg
                flex-shrink-0
                shadow-lg
              `}
              aria-label={`Avatar with initials ${avatarInitials}`}
            >
              {avatarInitials}
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="space-y-6">
          {/* Headline */}
          <h2
            className={`
              ${headlineClassName}
              text-[var(--text-primary-color)]
              font-bold
              leading-tight
            `}
          >
            {headline}
          </h2>

          {/* Subtitle */}
          <p
            className={`
              ${subtitleClassName}
              text-[var(--opacity-text-color)]
            `}
          >
            {subtitle}
          </p>

          {/* Quote Section */}
          <div
            className={`
              bg-[var(--glass-color)]
              border border-[var(--glass-color-3)]
              rounded-2xl
              px-6 md:px-8
              py-4 md:py-6
              mt-8
            `}
          >
            <p
              className={`
                ${quoteClassName}
                text-[var(--opacity-text-color)]
                italic
              `}
            >
              {quote}
            </p>
          </div>

          {/* CTA Buttons Section */}
          <div
            className={`
              flex flex-col sm:flex-row
              gap-4
              mt-10
              pt-6
              border-t border-[var(--glass-color-3)]
            `}
          >
            {/* Primary Button */}
            <Button
              onClick={handlePrimaryClick}
              className={`
                bg-[var(--primary-color)]
                hover:bg-[var(--primary-color)]/90
                text-white
                font-semibold
                py-3 px-8
                rounded-full
                transition-all duration-200
                flex-1 sm:flex-none
              `}
              aria-label={primaryButtonText}
            >
              {primaryButtonText}
            </Button>

            {/* Secondary Button */}
            {showSecondaryButton && secondaryButtonText && (
              <Button
                onClick={handleSecondaryClick}
                variant="outline"
                className={`
                  border border-[var(--glass-color-3)]
                  hover:bg-[var(--glass-color-3)]
                  text-[var(--text-primary-color)]
                  font-semibold
                  py-3 px-8
                  rounded-full
                  transition-all duration-200
                  flex-1 sm:flex-none
                `}
                aria-label={secondaryButtonText}
              >
                {secondaryButtonText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurableCTA;

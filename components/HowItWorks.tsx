'use client';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useRef } from 'react';
import { SECTION } from '@/lib/sections';
import { useLocale } from '@/providers/locale';
import { cn } from '@/lib/utils';
import { Reveal } from './ui/Reveal';
import { SectionHeader } from './ui/SectionHeader';

/**
 * The four steps from enquiry to settlement.
 *
 * A single scroll progress value drives the connecting rule: horizontal
 * across four columns on desktop, vertical down the left edge on mobile. Each
 * step owns its own segment, so the line draws itself step by step as the
 * section passes through the viewport.
 */
export function HowItWorks() {
  const { t } = useLocale();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.6'],
  });

  const steps = t.howItWorks.steps;

  return (
    <section id={SECTION.howItWorks} className="border-y border-line bg-surface/30">
      <div className="shell py-28 lg:py-40">
        <SectionHeader
          index="02"
          eyebrow={t.howItWorks.eyebrow}
          lines={t.howItWorks.headline}
        />

        <div ref={sectionRef} className="mt-20 lg:mt-28">
          <ol
            aria-label={t.howItWorks.aria}
            className="grid gap-0 md:grid-cols-4 md:gap-8"
          >
            {steps.map((step, index) => (
              <Step
                key={step.title}
                index={index}
                total={steps.length}
                title={step.title}
                body={step.body}
                progress={scrollYProgress}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({
  index,
  total,
  title,
  body,
  progress,
}: {
  index: number;
  total: number;
  title: string;
  body: string;
  progress: MotionValue<number>;
}) {
  const reduced = useReducedMotion();
  const start = index / total;
  const end = (index + 1) / total;

  const fill = useTransform(progress, [start, end], [0, 1], { clamp: true });
  const nodeOpacity = useTransform(progress, [start - 0.04, start + 0.02], [0.25, 1], {
    clamp: true,
  });

  const isLast = index === total - 1;
  const staticFill = reduced ? 1 : undefined;

  return (
    <li className={cn('relative pl-10 md:pl-0', !isLast && 'pb-14 md:pb-0')}>
      {/* Vertical rule — mobile and tablet. */}
      {!isLast && (
        <>
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[3px] top-8 w-px bg-line md:hidden"
          />
          <motion.span
            aria-hidden="true"
            className="absolute bottom-0 left-[3px] top-8 w-px origin-top bg-champagne/60 md:hidden"
            style={{ scaleY: staticFill ?? fill }}
          />
        </>
      )}

      {/* Node — mobile. */}
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-[7px] h-[7px] w-[7px] rotate-45 bg-champagne md:hidden"
        style={{ opacity: reduced ? 1 : nodeOpacity }}
      />

      <span className="font-sans text-micro tnum text-champagne">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Node and horizontal rule — desktop. */}
      <div className="relative mt-8 hidden h-[7px] items-center md:flex">
        <motion.span
          aria-hidden="true"
          className="h-[7px] w-[7px] shrink-0 rotate-45 bg-champagne"
          style={{ opacity: reduced ? 1 : nodeOpacity }}
        />
        {!isLast && (
          <span aria-hidden="true" className="relative ml-4 h-px flex-1">
            <span className="absolute inset-0 bg-line" />
            <motion.span
              className="absolute inset-0 origin-left bg-champagne/60"
              style={{ scaleX: staticFill ?? fill }}
            />
          </span>
        )}
      </div>

      <Reveal delay={index * 0.06} className="mt-6 md:mt-9">
        <h3 className="font-display text-xl uppercase tracking-wide text-bone lg:text-2xl">
          {title}
        </h3>
        <p className="mt-4 max-w-measure font-sans text-sm leading-relaxed text-ash">
          {body}
        </p>
      </Reveal>
    </li>
  );
}

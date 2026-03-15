import React, { Suspense, lazy } from "react";
import Hero from "@/components/Hero";
import MeetZangi from "@/components/MeetZangi";
import DeferredSection from "@/components/DeferredSection";

const StoryWorld = lazy(() => import("@/components/StoryWorld"));
const ActivitiesHighlights = lazy(() => import("@/components/ActivitiesHighlights"));
const FeaturedBooks = lazy(() => import("@/components/FeaturedBooks"));
const ForParents = lazy(() => import("@/components/ForParents"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const FinalCTA = lazy(() => import("@/components/FinalCTA"));

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <MeetZangi />
      <DeferredSection minHeightClass="min-h-[720px]">
        <Suspense fallback={null}>
          <StoryWorld />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeightClass="min-h-[540px]">
        <Suspense fallback={null}>
          <ActivitiesHighlights />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeightClass="min-h-[780px]">
        <Suspense fallback={null}>
          <FeaturedBooks />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeightClass="min-h-[620px]">
        <Suspense fallback={null}>
          <ForParents />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeightClass="min-h-[520px]">
        <Suspense fallback={null}>
          <Testimonials />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeightClass="min-h-[520px]">
        <Suspense fallback={null}>
          <FinalCTA />
        </Suspense>
      </DeferredSection>
    </div>
  );
};

export default Home;

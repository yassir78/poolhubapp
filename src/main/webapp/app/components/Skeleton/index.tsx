import React from 'react';

const Skeleton = () => {

  const singleSkeleton = () => {
    return <div className="border border-gray-border bg-white shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex flex-col py-1 flex-1 space-y-4 space-x-4">
        <div className="rounded-lg bg-secondary h-20 w-full"/>
        <div className="h-4 bg-secondary rounded w-3/4"/>
        <div className="space-y-2">
          <div className="h-4 bg-secondary rounded"/>
          <div className="h-4 bg-secondary rounded w-5/6"/>
          <div className="h-4 bg-secondary rounded w-2/6"/>
          <div className="h-4 bg-secondary rounded w-4/6"/>
        </div>
      </div>
    </div>
  }

  return (
    <ul
      className=" mt-1 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-1 md:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-4">
      {singleSkeleton()}
      {singleSkeleton()}
      {singleSkeleton()}
      {singleSkeleton()}
      {singleSkeleton()}
      {singleSkeleton()}
    </ul>
  );
};

export default Skeleton;

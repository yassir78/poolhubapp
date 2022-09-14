import React from 'react';

const Skeleton = () => {
  return (
    <ul className=" mt-1 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-1 md:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-4">
      <div className="border border-primary shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-primary h-12 w-12" />
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-primary rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-primary rounded" />
              <div className="h-4 bg-primary rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
      <div className="border border-primary shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-primary h-12 w-12" />
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-primary rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-primary rounded" />
              <div className="h-4 bg-primary rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
      <div className="border border-primary shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-primary h-12 w-12" />
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-primary rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-primary rounded" />
              <div className="h-4 bg-primary rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
      <div className="border border-primary shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-primary h-12 w-12" />
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-primary rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-primary rounded" />
              <div className="h-4 bg-primary rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
      <div className="border border-primary shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-primary h-12 w-12" />
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-primary rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-primary rounded" />
              <div className="h-4 bg-primary rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
      <div className="border border-primary shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-primary h-12 w-12" />
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-primary rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-primary rounded" />
              <div className="h-4 bg-primary rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
    </ul>
  );
};

export default Skeleton;

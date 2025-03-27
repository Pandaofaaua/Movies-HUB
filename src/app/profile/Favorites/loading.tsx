export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-inherit z-[9999]">
      <div className="animate-spin rounded-full h-12 w-12 md:h-24 md:w-24 border-4 md:border-6 border-black dark:border-white border-t-black/0 dark:border-t-white/0"></div>
      <h2 className="m-4 md:m-8 text-xl md:text-3xl text-black dark:text-white font-bold">
        Loading...
      </h2>
    </div>
  );
}

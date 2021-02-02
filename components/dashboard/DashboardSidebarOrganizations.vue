<template>
  <div class="fixed h-screen w-16 bg-white dark:bg-gray-900 shadow-xs">
    <div class="h-full flex flex-col items-center justify-between overflow-y-auto hide-scrollbar">
      <div>
        <div class="mt-5">
          <button class="h-10 w-10 bg-blue-500 rounded-lg focus:outline-none">
            <p class="text-center text-white text-2xl font-semibold">
              P
            </p>
          </button>
        </div>

        <div class="mt-5">
          <button class="h-10 w-10 bg-red-500 rounded-lg focus:outline-none">
            <p class="text-center text-white text-2xl font-semibold">
              R
            </p>
          </button>
        </div>

        <div class="mt-5">
          <button class="h-10 w-10 border border-gray-400 rounded-lg focus:outline-none">
            <p class="text-center text-gray-600 text-2xl">
              +
            </p>
          </button>
        </div>
      </div>
      <div>
        <theme-switch />
      </div>
    </div>
  </div>
</template>

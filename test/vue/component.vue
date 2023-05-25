<template>
  <div :class="['d-flex', 'justify-center', 'navBar', 'mt-3.75rem', 'width-2/3', 'gap-10px']">
    <div :class="{'pt-2px': true}">
      Test
    </div>
    <span class="md:mb-20px dark:bgColor-hex333 toDark:bgColor-hex333 toLight:bgColor-hexfff hover:color-green borderTop-none w-33.333333pct">
      Border
    </span>
    <span class="primary-light-20 bgColor-lighten(006efd,0) hover:primary-light md:hover:primary-light md:hover:mt-2px">
      color
    </span>
    <span class="rtl:ml-2 ltr:mr-2">
      direction
    </span>
  </div>
</template>

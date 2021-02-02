<template>
  <button
    type="button"
    :disabled="disabled"
    :class="[
      sizeClasses,
      { [`bg-${bgColor}`]: bgColor && !disabled },
      { [`hover:bg-${bgHoverColor}`]: bgHoverColor && !disabled },
      { [`bg-${disabledBgColor}`]: disabled },
      { [`text-${txtColor}`]: txtColor },
      { [`rounded-${rounded}`]: rounded },
    ]"
    class="cursor-pointer focus:outline-none transition duration-100 ease-in-out"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    disabled: {
      type: Boolean,
      description: 'Whether the button is disabled',
      default: false
    },
    disabledBgColor: {
      type: String,
      description: 'Disabled button background color',
      default: 'indigo-300'
    },
    bgColor: {
      type: String,
      description: 'Button background color',
      default: 'indigo-500'
    },
    bgHoverColor: {
      type: String,
      description: 'Button hover:background color',
      default: 'indigo-600'
    },
    txtColor: {
      type: String,
      description: 'Button text color',
      default: 'white'
    },
    size: {
      type: String,
      description: 'Button size',
      default: 'md',
      validator: (value) => {
        const acceptedValues = ['xs', 'sm', 'md', 'lg', 'xl']
        return acceptedValues.includes(value)
      }
    },
    rounded: {
      type: String,
      description: 'Corner radius',
      default: 'md'
    }
  },
  computed: {
    sizeClasses () {
      switch (this.size) {
        case 'xs':
          return 'text-xs px-2 py-1'
        case 'sm':
          return 'text-sm px-2 py-2'
        case 'md':
          return 'text-md px-3 py-2'
        case 'lg':
          return 'text-lg px-5 py-3'
        case 'xl':
          return 'text-xl px-8 py-4'
        default: throw new Error('Invalid prop')
      }
    }
  },
  methods: {
    handleClick (evt) {
      if (!this.disabled) {
        this.$emit('click', evt)
      }
    }
  }
}
</script>

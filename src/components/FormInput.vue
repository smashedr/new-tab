<script setup lang="ts">
import { i18n } from '#imports'
import { computed } from 'vue'
import { isMobile } from '@/utils/system.ts'
import { saveOptions } from '@/utils/options.ts'

const model = defineModel()

const props = withDefaults(
  defineProps<{
    id: string
    label?: string
    placeholder?: string
    tooltip?: string
    help?: string

    fa?: string

    max?: string
    min?: string
    step?: string

    type?: string
    autocomplete?: string
  }>(),
  {
    type: 'text',
    autocomplete: 'off',
  },
)

const labelText = computed(() => props.label || i18n.t(`option.input.${props.id}.label` as any))
const placeholderText = computed(() => props.label || i18n.t(`option.input.${props.id}.placeholder` as any))
const tooltipText = computed(() => props.tooltip || i18n.t(`option.input.${props.id}.tooltip` as any))
const helpText = computed(() => props.help || i18n.t(`option.input.${props.id}.help` as any))
</script>

<template>
  <div>
    <label for="testInput" class="form-label"><i v-if="fa" class="me-1" :class="fa"></i> {{ labelText }}</label>
    <i
      v-if="!isMobile && tooltipText"
      class="fa-solid fa-circle-info ms-2"
      data-bs-toggle="tooltip"
      :data-bs-title="tooltipText"
      v-bs
    ></i>
    <input
      v-model="model"
      :id="id"
      @change="saveOptions"
      :aria-describedby="`${id}-help`"
      :type="type"
      :placeholder="placeholderText"
      class="form-control"
      autocomplete="off"
      :max="max"
      :min="min"
      :step="step"
    />
    <div class="form-text" :id="`${id}-help`">{{ helpText }}</div>
  </div>
</template>

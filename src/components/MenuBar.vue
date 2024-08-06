<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { onClickOutside } from "@vueuse/core";

import { editMenuStore } from '@/stores/editMenus';
import { timeStore } from '@/stores/time';

const store = editMenuStore();

const isMenuOpens: Ref<boolean[]> = ref([false, false]);
const clickMoveState: Ref<boolean> = ref(false);

const storeEditMenu = editMenuStore();
const storeTime = timeStore();

const onHeaderMouseEnter = (index: number) => {
	if (isMenuOpens.value.includes(true)) {
		isMenuOpens.value.fill(false);
		isMenuOpens.value[index] = true;
	}
}

const onMenuClick = (outerIndex: number, innerIndex: number) => {
	storeEditMenu.actions[outerIndex][innerIndex].fire();
	isMenuOpens.value.fill(false);
}

const clickOutsideRef = ref(null);
onClickOutside(clickOutsideRef, () => {
	isMenuOpens.value.fill(false);
});
</script>

<template>
	<div v-if="store.contents.length === 0">no menus</div>
	<div v-else class="menu-bar-container" ref="clickOutsideRef">
		<div v-for="(unitContents, outerIndex) in store.contents" class="unit-menu-container" :class="(isMenuOpens[outerIndex]) ? 'open-menu' : ''" >
			<div class="menu-header" @click="isMenuOpens[outerIndex] = clickMoveState = !isMenuOpens[outerIndex]" @mouseenter="onHeaderMouseEnter(outerIndex)"> {{ unitContents[0] }}</div>
			<div class="menu-contents-container">
				<template v-for="(content, innerIndex) in unitContents.slice(1)">
					<div v-if="content === '!separator!'" class="menu-content separator">
						<div></div>
					</div>
					<div v-else class="menu-content" @click="onMenuClick(outerIndex, innerIndex)">{{ content }}</div>
				</template>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
$menuColor: #e8e8e8;
$menuHoverColor: #d0d0d0;

.menu-bar-container {
	display: flex;
	width: fit-content;
	cursor: default;
	user-select: none;

	.unit-menu-container {
		position: relative;

		.menu-header {
			padding-inline: .25rem;
			transition: all .2s var(--circleLikeAnimation);
			background-color: $menuColor;
			

			&:hover {
				background-color: $menuHoverColor;
			}
		}

		.menu-contents-container {
			position: absolute;
			display: flex;
			flex-direction: column;
			left: 0;
			top: 100%;
			right: calc(100% - fit-content);
			width: max-content;
			padding: .25rem;
			background-color: transparent;
			box-shadow: 5px 5px 5px -2px rgba(0, 0, 0, 0.5);
			border: 1px solid #808080;
			opacity: 0;
			z-index: 100;

			.menu-content {
				// width: max-content;
				height: 0;
				padding-inline: .25rem;
				overflow-y: hidden;
				transition: padding-block .2s var(--circleLikeAnimation), height .2s var(--circleLikeAnimation), background-color .2s var(--circleLikeAnimation);
				
				justify-items: baseline;
			}
		}

		&.open-menu {
			.menu-contents-container {
				background-color: $menuColor;
				opacity: 1;
				z-index: 200;
				transition: opacity .2s var(--circleLikeAnimation);

				.menu-content {
					height: 1rem;
					padding-block: .25rem;
					line-height: 1.2rem;

					&:hover:not(.separator) {
						background-color: $menuHoverColor;
					}

					&.separator {
						box-sizing: border-box;
						height: .5rem;
						display: grid;
						justify-content: center;
						width: 100%;
						grid-template-columns: 1fr;
						justify-items: center;
						align-content: center;

						div {
							width: 100%;
							height: 100%;

							&::before {
								display: block;
								content: " ";
								height: 0;
								width: 100%;
								border-block-start: solid #a0a0a0 1px;
							}
						}
					}
				}
			}
		}
	}
}
</style>
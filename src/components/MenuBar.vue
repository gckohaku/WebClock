<script setup lang="ts">
import { editDataStore } from '@/stores/editData';
import { editMenuStore } from '@/stores/editMenus';
import { timeStore } from '@/stores/time';
import { ref, type Ref } from 'vue';

const store = editMenuStore();

const isMenuOpens: Ref<boolean[]> = ref([false, false]);
const clickMoveState: Ref<boolean> = ref(false);

const storeEditMenu = editMenuStore();
const storeEditData = editDataStore();
const storeTime = timeStore();
</script>

<template>
	<div v-if="store.contents.length === 0">no menus</div>
	<div v-else class="menu-bar-container" @mouseleave="clickMoveState = false">
		<div v-for="(unitContents, outerIndex) in store.contents" class="unit-menu-container" :class="(isMenuOpens[outerIndex]) ? 'open-menu' : ''" @click="isMenuOpens[outerIndex] = clickMoveState = !isMenuOpens[outerIndex]" @mouseleave="isMenuOpens[outerIndex] = false" @mouseenter="isMenuOpens[outerIndex] = clickMoveState ? true : false">
			<div class="menu-header"> {{ unitContents[0] }}</div>
			<div class="menu-contents-container">
				<div v-for="(content, innerIndex) in unitContents.slice(1)" class="menu-content" @click="storeEditMenu.actions[outerIndex][innerIndex].fire({target: storeEditData.dataTitle, dataName: storeTime.time.toString()})">
					{{ content }}
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
$menuColor: #e8e8e8;
$menuHoverColor: #d0d0d0;

.menu-bar-container {
	height: 20px;
	display: flex;
	width: fit-content;
	cursor: default;

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
			left: 0;
			top: 100%;
			right: calc(100% - fit-content);
			width: max-content;
			background-color: transparent;

			.menu-content {
				// width: max-content;
				height: 0;
				padding-inline: .2rem;
				overflow-y: hidden;
				transition: padding-block .2s var(--circleLikeAnimation), height .2s var(--circleLikeAnimation), background-color .2s var(--circleLikeAnimation);
				;
				opacity: 0;
			}
		}

		&.open-menu {
			.menu-contents-container {
				background-color: $menuColor;

				.menu-content {
					height: 1rem;
					padding-block: .1rem;
					opacity: 1;

					&:hover {
						background-color: $menuHoverColor;
					}
				}

			}
		}
	}
}
</style>
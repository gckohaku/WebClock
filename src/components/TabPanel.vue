<script setup lang="ts">
import { defineCustomElement, ref, type Ref } from 'vue';
import ParameterSettingArea from "./ParameterSettingArea.vue"
import TheWelcome from './TheWelcome.vue';

const components = [ParameterSettingArea, TheWelcome]
const tabList: string[] = ["パラメータ"];
const isSelectList: Ref<boolean[]> = ref([true]);
</script>

<template>
	<div class="tabpanel-wrapper">
		<ul role="tablist" class="tablist-area">
			<li v-for="(heading, index) of tabList" role="presentation"  :style="{backgroundColor: isSelectList[index] ? '#f0f0f0' : 'lightgray'}">
				<a :href="'#tabpanel' + index" role="tab" :area-controls="'tabpanel' + index" :area-selected="isSelectList[index] ? 'true' : 'false'" @click.prevent="isSelectList.fill(false)[index] = true">{{ heading }}</a>
			</li>
		</ul>
		<div class="tabpanel-container">
			<div v-for="(component, index) of components" :id="'tabpanel' + index" role="tabpanel" area-labelledby="tab" :area-hidden="isSelectList[index] ? 'false' : 'true'">
				<component :is="component" v-if="isSelectList[index]"></component>
			</div>
		</div>

		<!-- <ul role="tablist">
			<li role="presentation"><a href="#tabpanel1" role="tab" area-controls="tabpanel1" area-selected="true">パラメータ</a></li>
			<li role="presentation"><a href="#tabpanel2" role="tab" area-controls="tabpanel2">タブ2</a></li>
			<li role="presentation"><a href="#tabpanel3" role="tab" area-controls="tabpanel3">タブ3</a></li>
		</ul>

		<div class="tabpanel-container">
			<div id="property-panel" role="tabpanel" area-labelledby="tab">
				<component :is="ParameterSettingArea"></component>
			</div>
			<div id="tabpanel2" role="tabpanel" area-labelledby="tab" area-hidden="true">タブ2</div>
			<div id="tabpanel3" role="tabpanel" area-labelledby="tab" area-hidden="true">タブ3</div>
		</div> -->
	</div>
</template>

<style scoped lang="scss">
.tabpanel-wrapper {
	.tablist-area {
		display: flex;
		justify-content: left;
		gap: .2rem;


		li {
			padding-inline: .1rem;
			border-start-start-radius: 5px;
			border-start-end-radius: 5px;
			list-style: none;
			border: 1px #1c1c1c solid;
			border-block-end: none;

			a {
				text-decoration: none;
			}
		}
	}

	.tabpanel-container {
		overflow-y: scroll;
		border-block-start: 1px #1c1c1c solid;
	}
}
</style>
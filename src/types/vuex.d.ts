import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

declare module '@vue/runtime-core' {
	// store の state
	interface State {
		time: DateTime;
	}

	interface ComponentCustomProperties {
		$store: Store<State>
	}
}
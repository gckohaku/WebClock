import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

declare module '@vue/runtime-core' {
	// store の state
	interface State {
		time: DateTime;
	}

	// this.$store の型が使えるように
	interface ComponentCustomProperties {
		$store: Store<State>
	}
}
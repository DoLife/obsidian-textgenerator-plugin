import { App, Notice, FuzzySuggestModal, FuzzyMatch } from "obsidian";
import TextGeneratorPlugin from "src/main";
import { Model } from "src/types";
import debug from "debug";
const logger = debug("textgenerator:setModel");
export class SetModel extends FuzzySuggestModal<Model> {
	plugin: TextGeneratorPlugin;
	title: string;
	onChoose: (result: string) => void;
	constructor(
		app: App,
		plugin: TextGeneratorPlugin,
		onChoose: (result: string) => void,
		title = ""
	) {
		super(app);
		this.onChoose = onChoose;
		this.plugin = plugin;
		this.title = title;
		this.modalEl.insertBefore(
			createEl("div", { text: title, cls: "modelTitle" }),
			this.modalEl.children[0]
		);
	}

	getItems() {
		logger("getItems");
		const templates = Array.from(this.plugin.settings.models.keys()).map(
			(e: Model["id"]) => ({ id: e })
		);
		return templates;
	}

	getItemText(model: Model): string {
		return model.id;
	}

	onChooseItem(model: Model, evt: MouseEvent | KeyboardEvent) {
		logger("onChooseItem", model);
		new Notice(`Selected ${model.id}`);
		this.onChoose(model.id);
	}
}

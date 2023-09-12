/**
 * WordPress dependencies
 */
import * as React from "react";
import { List, arrayMove } from "react-movable";
import {
	__experimentalLinkControl as LinkControl,
	MediaUpload,
} from "@wordpress/block-editor";
import {
	Button,
	TextControl,
	IconButton,
	PanelBody,
} from "@wordpress/components";
import DragIcon from "./images/drag-icon.png";
import "./editor.scss";
const Edit = (props) => {
	const [items, setItems] = React.useState(props.attributes.locations);

	const [newIndex, setNewIndex] = React.useState();

	const {
		attributes: { blocks },
	} = props;
	const handleAddLocation = () => {
		const locations = [...props.attributes.locations];
		locations.push({
			address: "",
			imgUrl: "",
		});
		props.setAttributes({ locations });
		setItems(locations);
	};

	const handleRemoveLocation = (index) => {
		const locations = [...props.attributes.locations];
		locations.splice(index, 1);
		props.setAttributes({ locations });
		setItems(locations);
	};

	const handleLocationChange = (address, index) => {
		const locations = [...items];
		locations[index].address = address;
		props.setAttributes({ locations });
	};
	const onImageSelect = (newImgUrl, index) => {
		const locations = [...items];
		locations[index].imgUrl = newImgUrl.sizes.full.url;
		props.setAttributes({ locations });
	};
	let locationFields;

	if (props.attributes.locations.length) {
		locationFields = (
			<List
				values={items}
				onChange={({ oldIndex, newIndex }) => {
					setItems(arrayMove(items, oldIndex, newIndex));
				}}
				renderList={({ children, props }) => (
					<ul className="drag-zone" {...props}>
						{children}
					</ul>
				)}
				renderItem={({ value, props }) => {
					return (
						<li className="drag-item" {...props}>
							<div className="example-drag-handle">
								<img src={DragIcon} />
								<TextControl
									id="my-id"
									className="grf__location-address"
									placeholder="350 Fifth Avenue New York NY"
									value={value.address}
									onChange={(address) =>
										handleLocationChange(address, props.key)
									}
								/>

								<MediaUpload
									onSelect={(media) => {
										onImageSelect(media, props.key);
									}}
									render={({ open }) => {
										return value.imgUrl ? (
											<button onClick={open} className="image-slected">
												<img
												src={value.imgUrl}
											/>
											</button>
											
										) : (
											<button onClick={open}> Upload Image </button>
										);
									}}
								/>
								<IconButton
									className="grf__remove-location-address"
									icon="no-alt"
									label="Delete location"
									onClick={() => handleRemoveLocation(props.key)}
								/>
							</div>
						</li>
					);
				}}
			/>
		);
	}

	return [
		<PanelBody title={"Repeater block"}>
			{locationFields}
			<Button
				isSmall
				variant={"primary"}
				onClick={handleAddLocation.bind(this)}
			>
				{"Add row"}
			</Button>
		</PanelBody>,
		<PanelBody title={"Link control"}>
			<div>
				<h3>Link control</h3>
				<LinkControl
					searchInputPlaceholder="Search here..."
					value={props.attributes.post}
					settings={[
						{
							id: "opensInNewTab",
							title: "New tab?",
						},
						{
							id: "customDifferentSetting",
							title: "Has this custom setting?",
						},
					]}
					onChange={(newPost) => props.setAttributes({ post: newPost })}
					withCreateSuggestion={true}
					createSuggestion={(inputValue) =>
						props.setAttributes({
							post: {
								...props.attributes.post,
								title: inputValue,
								type: "custom-url",
								id: Date.now(),
								url: inputValue,
							},
						})
					}
					createSuggestionButtonText={(newValue) => `${"New:"} ${newValue}`}
				></LinkControl>
			</div>
		</PanelBody>,
	];
};

export default Edit;

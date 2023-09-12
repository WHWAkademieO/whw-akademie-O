/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import {
	RichText,
	MediaUpload,
	BlockControls,
	AlignmentToolbar,
	useBlockProps,
} from "@wordpress/block-editor";
import {
	Button,
	Panel,
	PanelHeader,
	PanelBody,
	PanelRow,
	TextControl,
	SelectControl,
	ToggleControl,
} from "@wordpress/components";
import axios from "axios";
import clsx from "clsx";
import { MultiSelect } from "react-multi-select-component";
import React, { useEffect, useState } from "react";
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import { useCallback } from "react";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const blockProps = useBlockProps();
	const {
		attributes: { events },
		setAttributes,
	} = props;
	const [data, setData] = useState([]);

	useEffect(() => {
		axios.get("/wp-json/wp/v2/event").then((res) => {
			setData(res?.data?.filter((item) => item?.status === "publish"));
			if (events?.length > 0) {
				setAttributes({
					events: res?.data?.filter((item) => item?.status === "publish"),
				});
			}
		});
	}, []);

	const handleSelectEvent = useCallback(
		(event) => {
			props.setAttributes({
				events: [...(props.attributes?.events || []), event],
			});
		},
		[props.setAttributes, props.attributes, data]
	);

	const handleDiselectEvent = useCallback(
		(selectEvent) => {
			props.setAttributes({
				events: props.attributes?.events?.filter(
					(event) => event?.title?.rendered !== selectEvent?.title?.rendered
				),
			});
		},
		[props]
	);

	return (
		<div {...blockProps}>
			<Panel header="Event block">
				<PanelBody title=" " initialOpen={false}>
					<div className="hero-wrapper">
						<div>
							<label>Event list:</label>
							{/* <MultiSelect
								style={{ padding: 0 }}
								className="custom-select"
								value={props?.attributes?.events?.map((item) => ({
									label: item?.title?.rendered,
									value: item?.id,
								}))}
								// placeholder="asdsd"
								hasSelectAll={false}
								// value={this.state.users} // e.g: value = [ 'a', 'c' ]
								onChange={(events) => {
									setAttributes({
										events: [
											...events.map((event) =>
												data.find((item) => item?.id == event.value)
											),
										],
									});
								}}
								options={data?.map((item) => ({
									label: item?.title?.rendered,
									value: item?.id,
								}))}
								__nextHasNoMarginBottom
							/> */}
						</div>
						{props?.attributes?.events?.length > 0 && (
							<div className="event-container">
								{props?.attributes?.events?.map((event) => (
									<div className="item" key={event.id}>
										<span>{event?.title?.rendered}</span>
										<button
											onClick={() => handleDiselectEvent(event)}
											style={{
												color: "red",
												marginLeft: 20,
												cursor: "pointer",
												background: "white",
												border: "none",
											}}
										>
											Remove
										</button>
									</div>
								))}
							</div>
						)}
						<div>
							<label>Event booked placeholder text:</label>
							<TextControl
								placeholder="Type your event booked label here"
								value={props?.attributes?.placeholder?.booked}
								onChange={(value) =>
									setAttributes({
										placeholder: {
											...props?.attributes?.placeholder,
											booked: value,
										},
									})
								}
							/>
						</div>
						<div>
							<label>Empty event placeholder text</label>
							<TextControl
								placeholder="Type your event empty label here"
								value={props?.attributes?.placeholder?.empty}
								onChange={(value) =>
									setAttributes({
										placeholder: {
											...props?.attributes?.placeholder,
											empty: value,
										},
									})
								}
							/>
						</div>
					</div>
				</PanelBody>
			</Panel>
		</div>
	);
}

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
	ToggleControl,
} from "@wordpress/components";
import axios from "axios";
import clsx from "clsx";
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
		attributes: { title, content, dot },
		setAttributes,
	} = props;
	const [data, setData] = useState([]);

	useEffect(() => {
		axios.get("/wp-json/wp/v2/download").then((res) => {
			setData(res?.data?.filter((item) => item?.status === "publish"));
		});
	}, []);

	const handleSelectDownload = useCallback(
		(download) => {
			props.setAttributes({
				downloads: [...(props.attributes?.downloads || []), download],
			});
		},
		[props.setAttributes, props.attributes, data]
	);

	const handleDiselectDownload = useCallback(
		(selectDownload) => {
			props.setAttributes({
				downloads: props.attributes?.downloads?.filter(
					(download) => download?.title?.rendered !== selectDownload?.title?.rendered
				),
			});
		},
		[props]
	);

	return (
		<div {...blockProps}>
			<Panel header="Download block">
				<PanelBody title=" " initialOpen={false}>
					<h4 style={{ color: "green" }}>Download list:</h4>
					<div className="relationship">
						<ul className="unselect">
							<h4>All download</h4>
							{data?.map((item) => (
								<li
									className={clsx(
										"list-item",
										props.attributes?.downloads
											?.map((download) => download?.title?.rendered)
											?.includes(item?.title?.rendered) && "has--selected"
									)}
									aria-disabled={
										props.attributes?.downloads
											?.map((download) => download?.title?.rendered)
											?.includes(item?.title?.rendered) && "has--selected"
									}
									onClick={() => handleSelectDownload(item)}
								>
									{item.title?.rendered}
								</li>
							))}
						</ul>
						<ul className="selected">
							<h4>Selected downloads</h4>
							{props.attributes?.downloads?.map((item) => (
								<li
									onClick={() => handleDiselectDownload(item)}
									className="list-item"
								>
									{item.title?.rendered}
								</li>
							))}
						</ul>
					</div>
				</PanelBody>
			</Panel>
		</div>
	);
}

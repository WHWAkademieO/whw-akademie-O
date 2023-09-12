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
	ToggleControl,
	SelectControl,
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
	const { setAttributes } = props;
	const [data, setData] = useState([]);

	useEffect(() => {
		axios
			.get("/wp-json/wp/v2/posts", {
				params: {
					order: "desc",
					orderby: "date",
				},
			})
			.then((res) => {
				const result = res?.data?.filter((item) => item?.status === "publish");
				setData(result);
				setAttributes({
					lastestNews: result?.slice(0, 4),
					featuredNew: props?.attributes?.featuredNew
						? result
								.map((item) => item.id)
								?.includes(props?.attributes?.featuredNew?.id)
							? result.find((item) => item.id)
							: props?.attributes?.featuredNew
						: {},
				});
			});
	}, []);

	useEffect(() => {
		if (props.attributes?.featuredNew) {
			setAttributes({
				lastestNews: data
					.filter((news) => news?.id !== props.attributes?.featuredNew?.id)
					.slice(0, 4),
			});
		}
	}, [props.attributes?.featuredNew]);

	const handleSelectNew = useCallback(
		(news) => {
			props.setAttributes({
				featuredNew: news,
			});
		},
		[props.setAttributes, props.attributes, data]
	);

	return (
		<div {...blockProps}>
			<Panel header="Featured News">
				<PanelBody title=" " initialOpen={false}>
					{/* <div className="relationship">
						<ul className="unselect">
							<h4>All News</h4>
							{data?.map((item) => (
								<li
									className={clsx("list-item")}
									onClick={() => handleSelectNew(item)}
								>
									{item.title?.rendered}
								</li>
							))}
						</ul>
						<ul className="selected">
							<h4>Selected News</h4>
							<h3>Featured news: </h3>
							{props?.attributes?.featuredNew ? (
								<p>{props?.attributes?.featuredNew?.title?.rendered}</p>
							) : (
								<p>No feature selected</p>
							)}
							<h3>4 latest news: </h3>
							{props.attributes?.lastestNews?.slice(0, 4)?.map((news) => (
								<li className="list-item">{news?.title?.rendered}</li>
							))}
						</ul>
					</div> */}
					<div className="hero-wrapper">
						<div>
							<label>Feature News:</label>
							<SelectControl
								// style={{ padding: 0 }}
								className="custom-select"
								value={props?.attributes?.featuredNew?.id}
								hasSelectAll={false}
								// value={this.state.users} // e.g: value = [ 'a', 'c' ]
								onChange={(featuredNew) => {
									// this.setState({ users });
									setAttributes({
										featuredNew: data.find((item) => item?.id == featuredNew),
									});
								}}
								options={data?.map((item) => ({
									label: item?.title?.rendered,
									value: item?.id,
								}))}
								__nextHasNoMarginBottom
							/>
						</div>
						<div>
							<label>Latest News:</label>
							{props.attributes?.lastestNews?.length > 0 && (
								<div className="event-container">
									{props.attributes?.lastestNews?.slice(0, 4)?.map((news) => (
										<div key={news?.id} className="item">
											<span>{news?.title?.rendered}</span>
										</div>
									))}
								</div>
							)}
						</div>
						<div>
							<label>CTA Label:</label>
							<div>
								<TextControl
									value={props.attributes?.ctaLabel}
									onChange={(val) => setAttributes({ctaLabel: val})}
									// label="label"
								/>
							</div>
						</div>
					</div>
				</PanelBody>
			</Panel>
		</div>
	);
}

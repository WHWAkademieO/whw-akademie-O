/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import {
	__experimentalLinkControl as LinkControl,
	RichText,
	useBlockProps,
	MediaUpload,
} from "@wordpress/block-editor";
import {
	Panel,
	TextControl,
	PanelBody,
	ToggleControl,
	GradientPicker,
	Button,
} from "@wordpress/components";
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

	const onChangeTitle = (value) => {
		setAttributes({ title: value });
	};

	return (
		<div {...blockProps}>
			<Panel header="Image Text block">
				<PanelBody title=" " initialOpen={false}>
					<div className="field-grid" key="container">
						<div className="hero-text">
							<RichText
								tagName="h2"
								className="callout-title"
								placeholder={__("Write a title…")}
								value={title}
								onChange={onChangeTitle}
							/>
						</div>
						<div>
							<RichText
								tagName="p"
								className="callout-content"
								placeholder={__("Type content here ...")}
								value={content}
								onChange={(value) => setAttributes({ content: value })}
							/>
						</div>
						<div
							className="field-grid"
							style={{ background: "#F2F0EB", padding: 20 }}
						>
							<div className="label-grid">
								<label>CTA:</label>
								<div>
									<TextControl
										placeholder="Type your cta label here"
										value={props.attributes?.cta?.label}
										onChange={(value) =>
											setAttributes({
												cta: { ...props.attributes?.cta, label: value },
											})
										}
									/>
								</div>
							</div>
							<div>
								<LinkControl
									searchInputPlaceholder="Search here..."
									value={props?.attributes?.cta?.href}
									settings={[]}
									onChange={(href) =>
										setAttributes({
											cta: {
												...props.attributes?.cta,
												href: { ...href, title: href.url },
											},
										})
									}
									withCreateSuggestion={true}
									createSuggestionButtonText={(newValue) =>
										`${"New:"} ${newValue}`
									}
								></LinkControl>
							</div>
						</div>
						<div>
							<ToggleControl
								label="Reverse"
								checked={props.attributes?.reverse}
								onChange={(value) => setAttributes({ reverse: value })}
							/>
						</div>
						<div>
							<label>Media:</label> <br />
							<MediaUpload
								multiple={true}
								gallery={true}
								onSelect={(e) => {
									props?.setAttributes({ images: e });
								}}
								render={({ open }) => {
									return props.attributes?.images ? (
										<div className="image_grid">
											{props.attributes?.images?.map((item, key) =>
												item.type === "image" ? (
													<button key={key} onClick={open}>
														<img
															style={{ width: "100%", height: "100%" }}
															src={item.url}
															alt={item.alt}
														/>
														
													</button>
												) : (
													<div key={key} onClick={open}>
														<video width="320" height="auto">
															<source src={item.url} type="video/mp4" />
														</video>
													</div>
												)
											)}
										</div>
									) : (
										<Button variant="primary" onClick={open}>
											Upload Image
										</Button>
									);
								}}
							/>
						</div>
						{/* <div>
							<label>Background gradient:</label>
							<div>
								<GradientPicker
									__nextHasNoMargin
									value={props.attributes?.backgroundGradient}
									onChange={(currentGradient) => {
										setAttributes({ backgroundGradient: currentGradient });
									}}
									gradients={[
										{
											name: "JShine",
											gradient:
												"linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)",
											slug: "jshine",
										},
										{
											name: "Moonlit Asteroid",
											gradient:
												"linear-gradient(135deg,#0F2027 0%, #203A43 0%, #2c5364 100%)",
											slug: "moonlit-asteroid",
										},
										{
											name: "Rastafarie",
											gradient:
												"linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)",
											slug: "rastafari",
										},
									]}
								/>
							</div>
						</div> */}
					</div>
				</PanelBody>
			</Panel>
		</div>
	);
}

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
	__experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import {
	Button,
	Panel,
	PanelHeader,
	PanelBody,
	PanelRow,
	ToggleControl,
	TextControl,
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
		className,
		isSelected,
		attributes: { title, description, image, video, cta },
		setAttributes,
	} = props;

	const onChangeTitle = (value) => {
		setAttributes({ title: value });
	};

	const onSelectImage = (media) => {
		setAttributes({
			image: media,
		});
	};
	return (
		<div {...blockProps}>
			<Panel header="Full width block">
				<PanelBody title=" " initialOpen={false}>
					<div className="full-widht-wrapper hero-wrapper" key="container">
						<div className="full-width-text">
							<label>Title:</label>
							<RichText
								tagName="h2"
								className="callout-title"
								placeholder={__("Write a title…")}
								value={title}
								onChange={onChangeTitle}
							/>
						</div>

						<div className="hero-text">
							<label>Description:</label>
							<RichText
								tagName="p"
								className="callout-description"
								placeholder={__("Write a description")}
								value={description}
								onChange={(value) => setAttributes({ description: value })}
							/>
						</div>
						<div
							style={{ background: "#F2F0EB", padding: 20 }}
							className="label-grid"
						>
							<label>CTA:</label>
							<div>
								<TextControl
									placeholder="Type your cta label here"
									value={cta?.label}
									onChange={(value) =>
										setAttributes({
											cta: { ...cta, label: value },
										})
									}
								/>
							</div>
							<div>
								<LinkControl
									searchInputPlaceholder="Search here..."
									value={cta?.href}
									settings={[]}
									onChange={(href) => setAttributes({ cta: { ...cta, href } })}
									withCreateSuggestion={true}
									createSuggestionButtonText={(newValue) =>
										`${"New:"} ${newValue}`
									}
								></LinkControl>
							</div>
						</div>
						<div>
							<h4>Image:</h4>
							<MediaUpload
								onSelect={onSelectImage}
								type="image"
								value={image}
								render={({ open }) =>
									!image ? (
										<Button
											variant="primary"
											// className={image ? "image-button" : "button button-large"}
											onClick={open}
										>
											{__("Upload Image")}
										</Button>
									) : (
										<div className="image_grid">
											<div onClick={open}>
												<img
													alt={image?.alt}
													src={image?.url}
													style={{
														width: "100%",
														height: "300px",
														marginTop: "20px",
														objectFit: "cover"
													}}
												/>
											</div>
										</div>
									)
								}
							/>
						</div>
						{/* <div className="callout-image">
							<h4>Video:</h4>
							<MediaUpload
								onSelect={(val) => setAttributes({ video: val })}
								type="video"
								allowedTypes={["audio"]}
								value={video}
								render={({ open }) =>
									!video ? (
										<Button
											variant="primary"
											// className={image ? "image-button" : "button button-large"}
											onClick={open}
										>
											{__("Upload Video")}
										</Button>
									) : (
										<div onClick={open}>
											<video width="320" height="240" controls>
												<source src={video?.url} type="video/mp4" />
											</video>
										</div>
									)
								}
							/>
						</div> */}
					</div>
				</PanelBody>
			</Panel>
		</div>
	);
}

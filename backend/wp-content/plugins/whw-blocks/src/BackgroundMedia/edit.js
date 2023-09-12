/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	__experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import {
	Panel,
	PanelBody,
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
		attributes: { title, description, media, video, cta },
		setAttributes,
	} = props;

	const onChangeTitle = (value) => {
		setAttributes({ title: value });
	};

	const onSelectMedia = (media) => {
		setAttributes({
			media: media,
		});
	};
	return (
		<div {...blockProps}>
			<Panel header="Background Media block">
				<PanelBody title=" " initialOpen={false}>
					<div className="full-widht-wrapper hero-wrapper" key="container">
						<label>Media:</label>
						<div>
							<label>Youtube embeded:</label>
							<div>
								<LinkControl
									searchInputPlaceholder="Search here..."
									value={props?.attributes?.youtubeLink}
									settings={[]}
									onChange={(href) =>
										setAttributes({
											youtubeLink: {
												...props.attributes?.youtubeLink,
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
							{/* <MediaUpload
								onSelect={onSelectMedia}
								// type="media"
								value={media}
								allowedTypes={["mp4", "video"]}
								render={({ open }) =>
									!media ? (
										<Button
											variant="primary"
											// className={media ? "media-button" : "button button-large"}
											onClick={open}
										>
											{__("Upload Media")}
										</Button>
									) : (
										<div className="media_grid">
											<div onClick={open}>
												<video
													autoPlay
													alt={media?.alt}
													src={media?.url}
													style={{
														width: "100%",
														height: "300px",
														marginTop: "20px",
														objectFit: "cover",
													}}
												/>
											</div>
										</div>
									)
								}
							/> */}
						</div>
					</div>
				</PanelBody>
			</Panel>
		</div>
	);
}

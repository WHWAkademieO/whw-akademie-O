/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	RichText,
	MediaUpload,
	BlockControls,
	AlignmentToolbar,
} from "@wordpress/block-editor";
/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save(props) {
	const {
		className,
		attributes: { title, mediaURL, body, alignment },
	} = props;

	
	return (
		<div className="bootstrap-block">
			<div >
				<RichText.Content
					tagName="h2"
					className="callout-title"
					value={title}
				/>
			</div>
			<div >
				<div >
					{mediaURL && <img className="the-image" src={mediaURL} />}
				</div>
			</div>
		</div>
	);
}

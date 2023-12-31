<?php


// Move Yoast to bottom
function sdheadless_move_yoast_to_bottom_post_editor() {
    return 'low';
}

add_filter('wpseo_metabox_prio', 'sdheadless_move_yoast_to_bottom_post_editor');

// Register custom Gutenberg Category

function register_layout_category( $categories ) {
	
	$categories[] = array(
		'slug'  => 'sd-blocks',
		'title' => 'SD Blocks'
	);

	return $categories;
}
if ( version_compare( get_bloginfo( 'version' ), '5.8', '>=' ) ) {
	add_filter( 'block_categories_all', 'register_layout_category' );
} else {
	add_filter( 'block_categories', 'register_layout_category' );
}


add_filter('use_block_editor_for_post_type', 'prefix_disable_gutenberg', 10, 2);
function prefix_disable_gutenberg($current_status, $post_type)
{
    // Use your post type key instead of 'product'
    if ($post_type === 'post' || $post_type === "event") return false;
    return $current_status;
}
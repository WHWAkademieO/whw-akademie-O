<?php
/**
 * Theme functionality.
 *
 * @author SaigonDigital
 * @package sd-headless-theme
 * @since 1.0.0
 */

// Theme functionality here.
include_once( get_stylesheet_directory() .'/functions/misc-functions.php'); // include first
include_once( get_stylesheet_directory() .'/functions/acf-options.php');
include_once( get_stylesheet_directory() .'/functions/wp-menus.php');
add_theme_support( 'post-thumbnails' );

add_action('rest_api_init', 'register_rest_images' );
function register_rest_images(){
    register_rest_field( array('post'),
        'fimg_url',
        array(
            'get_callback'    => 'get_rest_featured_image',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}
function get_rest_featured_image( $object, $field_name, $request ) {
    if( $object['featured_media'] ){
        $img = wp_get_attachment_image_src( $object['featured_media'], 'app-thumb' );
        return $img[0];
    }
    return false;
}

function hide_publishing_actions()
{
    $my_post_type = 'event';
    global $post;
    if ($post->post_type == $my_post_type) {
        echo '
             <style type="text/css">
                #edit-slug-box,
                #minor-publishing-actions,
                .block-editor-post-preview__dropdown, 
                a.components-button {
                     display:none;
                }
             </style>
           ';
    }
}
add_action('admin_head-post.php', 'hide_publishing_actions');
add_action('admin_head-post-new.php', 'hide_publishing_actions');

function add_custom_mime_types($mimes) {
    $mimes['ico'] = 'image/x-icon';
    return $mimes;
}
add_filter('upload_mimes', 'add_custom_mime_types');
// Theme blocks here.
// include_once( get_stylesheet_directory() .'/functions/gutenberg-blocks.php');




<?php
/**
 * The template for displaying all pages. *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template. *
 * @package incubator
 * by KeyDesign
 */
?>

<?php
$redux_ThemeTek = get_option('redux_ThemeTek');
$themetek_page_subtitle = get_post_meta(get_the_ID(), '_themetek_page_subtitle', true);
$themetek_page_showhide_title = get_post_meta(get_the_ID(), '_themetek_page_showhide_title', true);
$themetek_page_title_color = get_post_meta(get_the_ID(), '_themetek_page_title_color', true);
$themetek_page_title_subtitle_color = ' color:' . $themetek_page_title_color . ';';
$themetek_page_layout = get_post_meta(get_the_ID(), '_themetek_page_layout', true);
$themetek_page_top_padding = get_post_meta(get_the_ID(), '_themetek_page_top_padding', true);
$themetek_page_bottom_padding = get_post_meta(get_the_ID(), '_themetek_page_bottom_padding', true);
$themetek_post_id = get_the_ID();
$keydesign_header_image = wp_get_attachment_image_src(get_post_thumbnail_id($themetek_post_id), 'full', false);
get_header();
?>
<section class="section <?php echo esc_attr($post->post_name); ?>"
         style="background: #fff;<?php echo(!empty($themetek_page_top_padding) ? ' padding-top:' . esc_attr($themetek_page_top_padding) . ';' : ''); ?>
         <?php echo(!empty($themetek_page_bottom_padding) ? ' padding-bottom:' . esc_attr($themetek_page_bottom_padding) . ';' : ''); ?> ">
    <div id="solidarit-formations"></div>
</section>

<?php get_footer(); ?>

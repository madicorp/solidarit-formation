<?php
/**
 * Formation Formation_type.
 *
 * @since   0.1.0
 * @package Formation
 */

require_once dirname(__FILE__) . '/../vendor/taxonomy-core/Taxonomy_Core.php';

/**
 * Formation Formation_type.
 *
 * @since 0.1.0
 *
 * @see   https://github.com/WebDevStudios/Taxonomy_Core
 */
class F_Formation_type extends Taxonomy_Core
{
    /**
     * Parent plugin class.
     *
     * @var    Formation
     * @since  0.1.0
     */
    protected $plugin = null;

    /**
     * Constructor.
     *
     * Register Taxonomy.
     *
     * See documentation in Taxonomy_Core, and in wp-includes/taxonomy.php.
     *
     * @since  0.1.0
     *
     * @param  Formation $plugin Main plugin object.
     */
    public function __construct($plugin)
    {
        $this->plugin = $plugin;
        $this->hooks();

        parent::__construct(
        // Should be an array with Singular, Plural, and Registered name.
            array(
                __('Type formation', 'formation'),
                __('Types Formation', 'formation'),
                'f-formation-type',
            ),
            // Register taxonomy arguments.
            array(
                'hierarchical' => false,
            ),
            // Post types to attach to.
            array(
                'formation',
            )
        );
    }
    // Thanks:https://catapultthemes.com/adding-an-image-upload-field-to-categories/
    /**
     * Initiate our hooks.
     *
     * @since 0.1.0
     */
    public function hooks()
    {
        add_action('f-formation-type_add_form_fields', array($this, 'add_f_formation_type_image'), 10, 2);
        add_action('created_f-formation-type', array($this, 'save_f_formation_type_image'), 10, 2);
        add_action('f-formation-type_edit_form_fields', array($this, 'update_f_formation_type_image'), 10, 2);
        add_action('edited_f-formation-type', array($this, 'updated_f_formation_type_image'), 10, 2);
        add_action('admin_enqueue_scripts', array($this, 'load_media'));
        add_action('admin_footer', array($this, 'add_script'));
    }

    public function load_media()
    {
        wp_enqueue_media();
    }

    /*
     * Add a form field in the new f_formation_type page
     * @since 1.0.0
    */
    public function add_f_formation_type_image($taxonomy)
    { ?>
        <div class="form-field term-group">
            <label for="f_formation_type-image-id"><?php _e('Image', 'hero-theme'); ?></label>
            <input type="hidden" id="f_formation_type-image-id" name="f_formation_type-image-id" class="custom_media_url" value="">
            <div id="f_formation_type-image-wrapper"></div>
            <p>
                <input type="button" class="button button-secondary ct_tax_media_button" id="ct_tax_media_button"
                       name="ct_tax_media_button" value="<?php _e('Add Image', 'hero-theme'); ?>"/>
                <input type="button" class="button button-secondary ct_tax_media_remove" id="ct_tax_media_remove"
                       name="ct_tax_media_remove" value="<?php _e('Remove Image', 'hero-theme'); ?>"/>
            </p>
        </div>
        <?php
    }

    /*
     * Save the form field
     * @since 1.0.0
    */
    public function save_f_formation_type_image($term_id, $tt_id)
    {
        if (isset($_POST['f_formation_type-image-id']) && '' !== $_POST['f_formation_type-image-id']) {
            $image = $_POST['f_formation_type-image-id'];
            add_term_meta($term_id, 'f_formation_type-image-id', $image, true);
        }
    }

    /*
     * Edit the form field
     * @since 1.0.0
    */
    public function update_f_formation_type_image($term, $taxonomy)
    { ?>
        <tr class="form-field term-group-wrap">
            <th scope="row">
                <label for="f_formation_type-image-id"><?php _e('Image', 'hero-theme'); ?></label>
            </th>
            <td>
                <?php $image_id = get_term_meta($term->term_id, 'f_formation_type-image-id', true); ?>
                <input type="hidden" id="f_formation_type-image-id" name="f_formation_type-image-id" value="<?php echo $image_id; ?>">
                <div id="f_formation_type-image-wrapper">
                    <?php if ($image_id) { ?>
                        <?php echo wp_get_attachment_image($image_id, 'thumbnail'); ?>
                    <?php } ?>
                </div>
                <p>
                    <input type="button" class="button button-secondary ct_tax_media_button" id="ct_tax_media_button"
                           name="ct_tax_media_button" value="<?php _e('Add Image', 'hero-theme'); ?>"/>
                    <input type="button" class="button button-secondary ct_tax_media_remove" id="ct_tax_media_remove"
                           name="ct_tax_media_remove" value="<?php _e('Remove Image', 'hero-theme'); ?>"/>
                </p>
            </td>
        </tr>
        <?php
    }

    /*
     * Update the form field value
     * @since 1.0.0
     */
    public function updated_f_formation_type_image($term_id, $tt_id)
    {
        if (isset($_POST['f_formation_type-image-id']) && '' !== $_POST['f_formation_type-image-id']) {
            $image = $_POST['f_formation_type-image-id'];
            update_term_meta($term_id, 'f_formation_type-image-id', $image);
        } else {
            update_term_meta($term_id, 'f_formation_type-image-id', '');
        }
    }

    /*
     * Add script
     * @since 1.0.0
     */
    public function add_script()
    { ?>
        <script>
            jQuery(document).ready(function ($) {
                function ct_media_upload(button_class) {
                    var _custom_media = true,
                        _orig_send_attachment = wp.media.editor.send.attachment;
                    $('body').on('click', button_class, function (e) {
                        var button_id = '#' + $(this).attr('id');
                        var send_attachment_bkp = wp.media.editor.send.attachment;
                        var button = $(button_id);
                        _custom_media = true;
                        wp.media.editor.send.attachment = function (props, attachment) {
                            if (_custom_media) {
                                $('#f_formation_type-image-id').val(attachment.id);
                                $('#f_formation_type-image-wrapper').html('<img class="custom_media_image" src="" style="margin:0;padding:0;max-height:100px;float:none;" />');
                                $('#f_formation_type-image-wrapper .custom_media_image').attr('src', attachment.url).css('display', 'block');
                            } else {
                                return _orig_send_attachment.apply(button_id, [props, attachment]);
                            }
                        }
                        wp.media.editor.open(button);
                        return false;
                    });
                }

                ct_media_upload('.ct_tax_media_button.button');
                $('body').on('click', '.ct_tax_media_remove', function () {
                    $('#f_formation_type-image-id').val('');
                    $('#f_formation_type-image-wrapper').html('<img class="custom_media_image" src="" style="margin:0;padding:0;max-height:100px;float:none;" />');
                });
                // Thanks: http://stackoverflow.com/questions/15281995/wordpress-create-category-ajax-response
                $(document).ajaxComplete(function (event, xhr, settings) {
                    var queryStringArr = settings.data.split('&');
                    if ($.inArray('action=add-tag', queryStringArr) !== -1) {
                        var xml = xhr.responseXML;
                        $response = $(xml).find('term_id').text();
                        if ($response != "") {
                            // Clear the thumb image
                            $('#f_formation_type-image-wrapper').html('');
                        }
                    }
                });
            });
        </script>
    <?php }
}

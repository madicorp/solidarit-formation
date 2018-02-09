<?php
/**
 * Formation Formation_type_api.
 *
 * @since   0.1.0
 * @package Formation
 */

/**
 * Endpoint class.
 *
 * @since   0.1.0
 * @package Formation
 */
if (class_exists('WP_REST_Controller')) {
    class F_Formation_type_api extends WP_REST_Controller
    {
        /**
         * Parent plugin class.
         *
         * @var   Formation
         * @since 0.1.0
         */
        protected $plugin = null;

        /**
         * Constructor.
         *
         * @since  0.1.0
         *
         * @param  Formation $plugin Main plugin object.
         */
        public function __construct($plugin)
        {
            $this->plugin = $plugin;
            $this->hooks();
        }

        /**
         * Add our hooks.
         *
         * @since  0.1.0
         */
        public function hooks()
        {
            add_action('rest_api_init', array($this, 'register_routes'));
        }

        /**
         * Register the routes for the objects of the controller.
         *
         * @since  0.1.0
         */
        public function register_routes()
        {

            // Set up defaults.
            $version = '2';
            $namespace = 'formation/v' . $version;
            $base = 'formation-type-api';


            // Example register_rest_route calls.
            register_rest_route($namespace, '/' . $base, array(
                array(
                    'methods' => WP_REST_Server::READABLE,
                    'callback' => array($this, 'get_items'),
                    'permission_callback' => array($this, 'get_items_permission_check'),
                    'args' => array(),
                ),
            ));

            register_rest_route($namespace, '/' . $base . '/(?P<id>[\d]+)', array(
                    array(
                        'methods' => WP_REST_Server::READABLE,
                        'callback' => array($this, 'get_item'),
                        'permission_callback' => array($this, 'get_item_permissions_check'),
                        'args' => array(
                            'context' => array(
                                'default' => 'view',
                            ),
                        ),
                    ),
                    array(
                        'methods' => WP_REST_Server::EDITABLE,
                        'callback' => array($this, 'update_item'),
                        'permission_callback' => array($this, 'update_item_permissions_check'),
                        'args' => $this->get_endpoint_args_for_item_schema(false),
                    ),
                    array(
                        'methods' => WP_REST_Server::DELETABLE,
                        'callback' => array($this, 'delete_item'),
                        'permission_callback' => array($this, 'delete_item_permissions_check'),
                        'args' => array(
                            'force' => array(
                                'default' => false,
                            ),
                        ),
                    ),
                )
            );

        }


        private function prepare_result_for_response($result)
        {
            if (is_array($result)) {
                foreach ($result as $key => $term) {
                    $meta = get_term_meta($term->term_id, 'f_formation_type-image-id');
                    $result[$key]->image_meta = $meta;
                }
            } else {
                $meta = get_term_meta($result->term_id, 'f_formation_type-image-id');
                $result->image_meta = $meta;
            }
            return $result;
        }

        /**
         * Get items.
         *
         * @since  0.1.0
         *
         * @param  WP_REST_Request $request Full details about the request.
         * @return WP_REST_Response
         */
        public function get_items($request)
        {
            $args = array(
                'hide_empty' => 0,
            );
            $result = get_terms('f-formation-type', $args);
            $data = $this->prepare_result_for_response($result);

            return new WP_REST_Response($data, 200);
        }

        /**
         * Permission check for getting items.
         *
         * @since  0.1.0
         *
         * @param  WP_REST_Request $request Full details about the request.
         * @return bool
         */
        public function get_items_permission_check($request)
        {
            return true;
        }

        /**
         * Get item.
         *
         * @since  0.1.0
         *
         * @param  WP_REST_Request $request Full details about the request.
         * @return WP_REST_Response
         */
        public function get_item($request)
        {
            $params = $request->get_params();
            $args = array(
                'hide_empty' => 0,
            );
            $result = get_term($params["id"], 'f-formation-type', $args);
            $data = $this->prepare_result_for_response($result);

            return new WP_REST_Response($data, 200);
        }

        /**
         * Permission check for getting item.
         *
         * @since  0.1.0
         *
         * @param  WP_REST_Request $request Full details about the request.
         * @return bool
         */
        public function get_item_permissions_check($request)
        {
            return true;
        }

        /**
         * Update item.
         *
         * @since  0.1.0
         *
         * @param  WP_REST_Request $request Full details about the request.
         */
        public function update_item($request)
        {
        }

        /**
         * Permission check for updating items.
         *
         * @since  0.1.0
         *
         * @param  WP_REST_Request $request Full details about the request.
         * @return bool
         */
        public function update_item_permissions_check($request)
        {
            return false;
        }

        /**
         * Delete item.
         *
         * @since  0.1.0
         *
         * @param  WP_REST_Request $request Full details about the request.
         */
        public function delete_item($request)
        {
        }

        /**
         * Permission check for deleting items.
         *
         * @since  0.1.0
         *
         * @param  WP_REST_Request $request Full details about the request.
         * @return bool
         */
        public function delete_item_permissions_check($request)
        {
            return false;
        }
    }
}

<?php

namespace Drupal\pannellum_integration\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides pannellum display
 *
 * @Block(
 *   id = "pannellum_block",
 *   admin_label = @Translation("Pannellum block"),
 * )
 */
class PannellumBlock extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function build() {
    return array(
      '#type' => 'markup',
      '#theme' => 'pannellum_block',
      '#attached' => array(
        'library' => array(
          'pannellum_integration/pannellum',
          'pannellum_integration/pannellum_custom'
        ),
      ),
      '#cache' => array(
        'max-age' => 0,
      ),
    );
  }
}
?>
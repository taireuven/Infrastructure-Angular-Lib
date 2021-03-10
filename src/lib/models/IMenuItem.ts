/**
* An interface for Menu Item
*/
export interface IMenuItem {
  /**
  * The url of the image
  */
 imageUrl?: string;
    /**
  * The url of the image on direction ltr
  */
 imageUrlLtr?: string;
  /**
  * Whether the url is external url or internal route.
  */
  isExternal?: boolean;
  /**
  * Weather redirect to the url in current tab or open in new tab.
  */
  isStatic?: boolean;
  /**
  * The title of the item.
  */
  title?: string;
  /**
  * The title text key of the item.
  */
  titleKey?: string;
  /**
  * The url or route of item.
  */
  url: string;
  /**
  * Whether the item is disabled.
  */
  disabled?: boolean;
  /**
  * Menu Items Array for nested menu.
  */
  children?: IMenuItem[];
   /**
  * The url of the icon
  */
  iconName?: string;
  /**
  * A function that will trigger when this item is clicked on.
  */
  triggerFunction?: Function;

}


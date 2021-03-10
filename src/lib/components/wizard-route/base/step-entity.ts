/**
 * The Step entity for wizrad component.
 */
export class Step {
  /**
  * The title of step.
  */
  title?: string;
  /**
  * The title key of step.
  */
  titleKey?: string;
  /**
  * The routing path of the step content.
  */
  path: string;
  /**
  * The matirial icon name to be display beside the title.
  */
  icon?: string;
  /**
  * Tab Concept only! Whether the element is disabled.
  */
  disabled?: boolean;
}

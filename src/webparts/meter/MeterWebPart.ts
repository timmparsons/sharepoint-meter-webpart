import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { escape } from '@microsoft/sp-lodash-subset';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import styles from './MeterWebPart.module.scss';
import * as strings from 'MeterWebPartStrings';


export interface IMeterWebPartProps {
  title: string;
  description: string;
  percentage: number;
  color: string;
}

export default class MeterWebPart extends BaseClientSideWebPart<IMeterWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.meter }">
       <h1>${this.properties.title}</h1>
       <p>${this.properties.description}</p>
       <svg width="75%" height="75%" viewBox="0 0 42 42" class="donut" style="margin-left: 13%;">
        <circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
        <circle class="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#eee" stroke-width="4"></circle>
        <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="${this.properties.color}" stroke-width="4" stroke-dasharray="${this.properties.percentage} ${100 - this.properties.percentage}" stroke-dashoffset="25"></circle>
        <text class="donut-number" x="50%" y="50%" text-anchor="middle">${this.properties.percentage}%</text>
      </svg>     
      </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: "Title"
                }),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('percentage', {
                  label: 'Percentage'
                }),
                PropertyFieldColorPicker('color', {
                  label: 'Color',
                  selectedColor: this.properties.color,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'colorFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

import React from 'react';
import {
  Collapsible,
  CollapsibleItem,
  Collection,
  CollectionItem,
  Icon,
  TextInput
} from 'react-materialize';

const AdrRow = ({ name }) => {
  return (
    <CollectionItem>
      <span>{name}</span>
      <a className="secondary-content">
        <Icon>close</Icon>
      </a>
    </CollectionItem>
  );
};
export const AdressComponent = () => {
  return (
    <div className="section">
      <h5>Git - URl</h5>
      <form>
        <TextInput placeholder="URL" icon="create_new_folder" onSubmit="" />
      </form>
      <Collapsible>
        <CollapsibleItem
          header="Better safe than sorry. That's my motto."
          icon={<Icon>dehaze</Icon>}
        >
          <Collection>
            <AdrRow name="test1" />
            <AdrRow name="test2" />
          </Collection>
        </CollapsibleItem>
      </Collapsible>
    </div>
  );
};

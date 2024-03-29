export const getFavoritesByType = (state, getters) => {
  return (type) => {
    return getters
      .getTemplatesByType(type)
      .filter((template) => template.isFavorite === true);
  };
};

export const getTemplatesByType = (state) => {
  return (type) => {
    return state.templates.filter((template) => template.type === type);
  };
};

export const getCategoriesByType = (state) => {
  return (type) => {
    return state.categories.filter((category) => category.type === type);
  };
};

export const getFoldersByType = (state) => {
  return (type) => {
    return state.folders.filter((folder) => folder.type === type);
  };
};

export const getTemplateByID = (state) => {
  return (templateID) => {
    return state.templates.find((template) => template.id === templateID);
  };
};

export const getTemplateIndexByID = (state) => {
  return (payload) => {
    return payload.templates.findIndex(
      (template) => template.id === payload.templateID
    );
  };
};

export const getCategoryIndexByID = (state) => {
  return (categoryID) => {
    return state.categories.findIndex((category) => category.id === categoryID);
  };
};

export const getFolderIndexByID = (state) => {
  return (folderID) => {
    return state.folders.findIndex((folder) => folder.id === folderID);
  };
};

// takes templateType (String, "DIARY" or "EVENT") as an argument, chekcs if there is a default template
export const getDefaultTemplate = (state, getters) => {
  return (type) => {
    let templates = getters.getTemplatesByType(type);
    let result = templates.findIndex(
      (template) => template.isSetToDefault === true
    );
    if (result != -1) {
      return templates[result].text;
    } else {
      return undefined;
    }
  };
};

export const getParentsOfChild = (state) => {
  return (payload) => {
    let possibleParents = payload.parents;
    let child = payload.child;
    let parentsOfChild = [];
    for (let i = 0; i < possibleParents.length; i++) {
      if (possibleParents[i].storedIDs != undefined) {
        if (possibleParents[i].storedIDs.includes(child.id)) {
          parentsOfChild.push(possibleParents[i]);
        }
      }
    }
    return parentsOfChild;
  };
};

export const getFolderContent = (state) => {
  return (folder, categories) => {
    let array = [];
    if (folder.storedIDs != undefined) {
      folder.storedIDs.forEach((ID) => {
        array.push(categories.find((category) => category.id === ID));
      });
    }
    return array;
  };
};

export const getTemplatesFromCategory = (state) => {
  return (category, templates) => {
    let array = [];
    if (category.storedIDs != undefined) {
      category.storedIDs.forEach((ID) => {
        array.push(templates.find((template) => template.id === ID));
      });
    }
    return array;
  };
};

export const isCategoryEmpty = (state) => {
  return (category) => {
    if (category.storedIDs === undefined) {
      return true;
    } else {
      return false;
    }
  };
};

// returns a boolean
export const areCategoriesInFolderEmpty = (state, getters) => {
  return (folder, categories) => {
    let folderIsEmpty;
    // if folder doesn't have any categories, return true
    if (folder.storedIDs === undefined) {
      folderIsEmpty = true;
      // if folder has categories, check if they are empty
    } else {
      folder.storedIDs.forEach((categoryIDInFolder) => {
        // get the category by using the id stored in the folder
        let category = categories.find(
          (category) => category.id === categoryIDInFolder
        );
        // if the category is empty, return true
        if (getters.isCategoryEmpty(category)) {
          folderIsEmpty = true;
        } else {
          folderIsEmpty = false;
        }
      });
    }
    return folderIsEmpty;
  };
};

// returns all folders that aren't empty; meaning folders which hold categories which hold templates
export const getNonEmptyFolders = (state, getters) => {
  return (folders, categories) => {
    let array = [];
    folders.forEach((folder) => {
      if (!getters.areCategoriesInFolderEmpty(folder, categories)) {
        array.push(folder);
      }
    });
    return array;
  };
};

// checks if the provided item is a child of any parent of the parents-array and returns true if so
export const isItemChildToAnyParent = (state) => {
  return (payload) => {
    let parents = payload.parents;
    let child = payload.child;
    let isChildFromParent;
    for (let i = 0; i < parents.length; i++) {
      // if we find a parent to our item, we leave the loop early.
      if (parents[i].storedIDs != undefined) {
        if (parents[i].storedIDs.includes(child.id)) {
          isChildFromParent = true;
          return isChildFromParent;
        } else {
          isChildFromParent = false;
        }
      } else {
        isChildFromParent = false;
      }
    }
    return isChildFromParent;
  };
};

export const getCategoriesWithoutFolders = (state, getters) => {
  return (payload) => {
    let categories = payload.categories;
    let folders = payload.folders;
    /* we only want to get folderless categories,
      the following filtering process only returns those category-items, that meet the condition
      ("isItemChildToAnyParent" returning false) as that means it's folderless */
    return categories.filter((category) => {
      let data = { parents: folders, child: category };
      return getters.isItemChildToAnyParent(data) === false;
    });
  };
};

export const getTemplatesWithoutCategories = (state, getters) => {
  return (payload) => {
    let categories = payload.categories;
    let templates = payload.templates;

    return templates.filter((template) => {
      let data = { parents: categories, child: template };
      return getters.isItemChildToAnyParent(data) === false;
    });
  };
};

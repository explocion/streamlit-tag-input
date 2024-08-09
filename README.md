# `streamlit-tag-input`: Input Component for Tags
A custom input component for tag inputs.

## Usage
```python
def tag_input(
    label: str,
    limit_tags: int = -1,
    default: Optional[List[str]] = None,
    key: Optional[Key] = None,
    on_change: Optional[WidgetCallback] = None,
    *,
    placeholder: str = "",
) -> List[str]:
    """
    Creates a tag input component.

    Args:
        label (str): The label for the tag input.
        limit_tags (int): The maximum number of tags shown when not focused. Defaults to -1 (no limit).
        default (Optional[List[str]]): The default list of tags. Defaults to None.
        key (Optional[Union[str, int]]): A unique key for the component. Defaults to None.
        on_change (Optional[WidgetCallback]): An optional callback invoked when the value changes.
        placeholder (str): Placeholder text for the input field. Defaults to an empty string.

    Returns:
        List[str]: The list of tags entered by the user.
    """
    ...
```

## Implementation
This package waps the `Autocomplete` React component from Material UI to create a tag input component for Streamlit.

import streamlit as st
from streamlit_tag_input import tag_input

st.set_page_config(page_title="Streamlit Tag Input Component")
st.title("Streamlit Tag Input Component")

tags = tag_input(
    "Custom Tags", default=["Hello"], limit_tags=3
)

st.write("Tags")
st.json(tags)

import streamlit as st
from streamlit_tag_input import tag_input

st.set_page_config(page_title="Streamlit Tag Input Component")
st.title("Streamlit Tag Input Component")

tags = tag_input("Custom Tag Inputs", limit_tags=3, default=["Hello"])
st.json(tags)

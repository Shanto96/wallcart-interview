import { useQuery, useMutation } from "@apollo/client";
import GET_PRODUCT_BY_ID from "../lib/queries/getProductById";
import CREATE_CATEGORY from "../lib/queries/createCategory";
import UPDATE_CATEGORY from "../lib/queries/updateCategory";
import { initializeApollo } from "../lib/apollo";
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategories,
  createCategory,
  updateCategory,
} from "../lib/store/actions";
import { AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";

const VARIABLE = "cbraz";

export default function Home() {
  const [selectedId, setSelectedId] = useState(null);
  const [updatedName, setUpdatedName] = useState(null);

  const dispatch = useDispatch();

  const [addCategory] = useMutation(CREATE_CATEGORY);
  const [editCategory] = useMutation(UPDATE_CATEGORY);

  const categoryNameRef = useRef();
  const [selectedParentId, setSelectedParentId] = useState(null);
  const parentIDRef = useRef();
  const { data, error, loading } = useQuery(GET_PRODUCT_BY_ID);

  useEffect(() => {
    const getCategories = () => {
      dispatch(setCategories(data?.getCategories?.result?.categories));
    };

    getCategories();
  }, []);

  let categories = data?.getCategories?.result?.categories;
  console.log(categories);

  console.log(data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(e.target?.categoryName.value);
    console.log(selectedParentId);
    try {
      const res = await addCategory({
        variables: {
          Name: e.target?.categoryName.value,
          ParentCategoryId: selectedParentId,
        },
      });

      if (res.data.createCategory.statusCode == 200) {
        toast.success("category Updated");
      } else {
        toast.warn("something went wrong");
      }
      await dispatch(createCategory(res.data.createCategory.result));
    } catch (error) {
      toast.warn("something went wrong");
      console.log({ error });
    }
  };
  categories = useSelector((state) => state.category);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await editCategory({
        variables: {
          uId: selectedId,
          name: updatedName,
        },
      });
      console.log(res);
      dispatch(updateCategory(res.data.updateCategory.result));
      setSelectedId(null);
      if (res.data.updateCategory.statusCode == 200) {
        toast.success("category Updated");
      } else {
        toast.warn("something went wrong");
      }
    } catch (error) {
      console.log({ error });
      toast.warn("something went wrong");
    }
  };
  return (
    <div>
      <h1></h1>

      {categories?.map((cat) => (
        <>
          {" "}
          {cat.uid === selectedId ? (
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                name="updateCat"
              />
              <button type="submit">update</button>
            </form>
          ) : (
            <p>
              <AiFillEdit
                onClick={() => {
                  setSelectedId(cat.uid);
                  setUpdatedName(cat.name);
                }}
              />
              &nbsp;&nbsp;
              {cat.name}
            </p>
          )}
        </>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Category name"
          ref={categoryNameRef}
          name="categoryName"
        />
        <select
          ref={parentIDRef}
          name="parentCategory"
          onChange={(e) => {
            console.log(e.target.value);
            setSelectedParentId(e.target.value);
          }}
        >
          <option value="" selected disabled>
            select parent category
          </option>
          {categories?.map((cat) => (
            <option value={cat.uid} key={cat.uid}>
              {cat.name}{" "}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: GET_PRODUCT_BY_ID,
    variables: { code: VARIABLE },
  });
  return { props: { initialApolloState: apolloClient.cache.extract() } };
};

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import FileBase64 from "react-file-base64";
import {
    Button,
    TextField,
} from "@material-ui/core";
import { useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {updatePost} from "../actions/post";

const useStyles = makeStyles( (theme) => ({
    textField: {
        marginBottom: theme.spacing(2)
    },

    buttons: {
        marginTop: theme.spacing(2)
    }
}));

const postSchema = yup.object().shape({
    title: yup.string().required(),
    author: yup.string().max(100).required(),
    content: yup.string().min(100).required(),
});

const EditPostForm = ( { history, post, closeEditMode }) => {
    const dispatch = useDispatch();

    const [file, setFile] = useState(post?.image);
  
    const { register, handleSubmit, formState:{errors}, reset } = useForm({
        resolver: yupResolver(postSchema),
    });

    const onSubmit = (data) => {
        const updatedPost = {
            _id: post._id,
            ...data,
            image: file,
        };

        dispatch(updatePost(post._id, updatedPost));
        reset();
        setFile(null);
        closeEditMode();
    };



    const classes = useStyles();

    return (
            <div>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                    id = "title"
                    label = "Title"
                    name = "title"
                    variant = "outlined"
                    className={classes.textField}
                    size = "small"
                    inputRef = {register}
                    error = {errors.title ? true : false}
                    fullWidth
                    defaultValue={post?.title}
                    />

                    <TextField
                    id = "author"
                    label = "Author"
                    name = "author"
                    variant = "outlined"
                    className={classes.textField}
                    size = "small"
                    inputRef = {register}
                    error = {errors.author ? true : false}
                    fullWidth
                    defaultValue={post?.author}
                    />

                    <TextField
                    id = "content"
                    label = "Content"
                    name = "content"
                    multiline
                    rows = {4}
                    variant = "outlined"
                    className={classes.textField}
                    size = "small"
                    inputRef = {register}
                    error = {errors.content ? true : false}
                    fullWidth
                    defaultValue={post?.content}
                    />

                    <FileBase64 multiple={false} onDone={({base64}) => setFile(base64)}/>

                    <div className = {classes.buttons}>
                    <Button color="Secondary" variant="outlined" type="submit" onClick={closeEditMode}>
                            Drop
                        </Button> {" "}
                        <Button color="primary" variant="outlined" type="submit">
                            Save
                        </Button>
                        
                    </div>
                </form>
            </div>

           
  );
};

export default EditPostForm;
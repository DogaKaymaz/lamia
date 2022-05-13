import React from 'react';
import { makeStyles } from '@material-ui/core';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import { useForm} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const useStyles = makeStyles( (theme) => ({
    paper: {
        padding: theme.spacing(2)
    },
    textField: {
        marginBottom: theme.spacing(2),
    },
}));

const postSchema = yup.object().shape({
    title: yup.string().required(),
    author: yup.string().max(100).required(),
    content: yup.string().min(100).required(),
});

const AddPostForm = ( { open, handleClose }) => {
  
    const { register, handleSubmit, formState:{errors}, reset } = useForm({
        resolver: yupResolver(postSchema)
    });

    const classes = useStyles();

    return (
    <Dialog open = {open} onClose={handleClose}>
        <DialogTitle>Create a New Post </DialogTitle>
        <DialogContent>
            <DialogContentText>
            Fill in the Form Below to Add a New Post.
            </DialogContentText> 

            <div className = {classes.root}>
                <form noValidate autoComplete='off'>
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
                    />
                </form>
            </div>

            </DialogContent>
            <DialogActions>
                <Button color="inherit">Drop</Button>
                <Button type = "submit" variant = "outlined" color="primary">Publish</Button>
            </DialogActions>
    </Dialog>
  )
};

export default AddPostForm;
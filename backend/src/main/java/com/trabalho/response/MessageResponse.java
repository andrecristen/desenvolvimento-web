package com.trabalho.response;

import java.util.ArrayList;

public class MessageResponse {

    private boolean success;

    private String message;

    private ArrayList<ParamResponse> params;

    public MessageResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public MessageResponse(boolean success, String message, ArrayList<ParamResponse> params) {
        this.success = success;
        this.message = message;
        this.params = params;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ArrayList<ParamResponse> getParams() {
        return params;
    }

    public void setParams(ArrayList<ParamResponse> params) {
        this.params = params;
    }

    public void addParam(ParamResponse param) {
        if (this.params == null) {
            this.params = new ArrayList<>();
        }
        this.params.add(param);
    }

}

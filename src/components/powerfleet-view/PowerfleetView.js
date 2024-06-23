import { useCallback, useEffect, useState } from 'react';
import { IframeForm } from '../iframe-form/IframeForm';
import { IframeView } from '../iframe-view/IframeView';
import { queryFromObj, getTokenExpireStr } from '../../utils/tools';
import { CheckList } from '../check-list/CheckList';
import './style.scss';


const getLocalForm = () => {
    const data = JSON.parse(localStorage.getItem('form'));
    const defaultForm = {
        baseUrl: appConfig.sites[0].url,
        page: appConfig.pages[0].path
    };
    return data ?? defaultForm;
};

export const PowerfleetView = () => {
    const [form, setForm] = useState(getLocalForm());
    const [src, setSrc] = useState(form.baseUrl);
    const [query, setQuery] = useState({ langId: 1 });

    const setLocalForm = useCallback((form) => {
        localStorage.setItem('form', JSON.stringify(form));
    }, []);

    useEffect(() => {
        setLocalForm(form);
    }, [form, setLocalForm]);

    const onChange = useCallback((e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }, []);

    const onQueryChange = useCallback((e) => {
        const { name, value } = e.target;
        const query = { [name]: encodeURIComponent(value?.trim()) }
        if (query.token) {
            query.expire = encodeURIComponent(getTokenExpireStr(query.token) ?? '')
        }
        setQuery((prev) => ({ ...prev, ...query }));
    }, []);

    const onClickGo = useCallback(() => {
        setSrc(form.fullUrl);
    }, [form]);

    const onSubmit = useCallback(() => {
        const { baseUrl, page } = form;
        const fullUrl = `${baseUrl}${page}`;
        const queries = queryFromObj(query);
        const url = fullUrl + queries;
        console.log('Submit link', url)
        if (baseUrl) {
            setSrc(url);
        } else {
            setSrc('');
        }
    }, [form, query]);

    return (
        <div className="powerfleet-view">
            <IframeForm
                form={form}
                query={query}
                onChange={onChange}
                onClickGo={onClickGo}
                onQueryChange={onQueryChange}
                onSubmit={onSubmit}
            >
                <CheckList/>
            </IframeForm>
            <IframeView title="Powerfleet iframe" src={src} />
        </div>
    );
};
